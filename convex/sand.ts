import { mutation, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const listSandTypes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("sandTypes").collect();
  },
});

export const seedSandTypes = mutation({
  args: {
    items: v.array(
      v.object({
        name: v.string(),
        category: v.string(),
        color: v.string(),
        image: v.string(),
        price: v.number(),
        grain: v.string(),
        moisture: v.string(),
        density: v.string(),
        origin: v.string(),
        icon: v.string(),
        desc: v.string(),
        uses: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("sandTypes").collect();
    const byName = new Map(existing.map((s) => [s.name, s]));
    const ids: string[] = [];
    for (const item of args.items) {
      const found = byName.get(item.name);
      if (found) {
        await ctx.db.patch(found._id, { ...item });
        ids.push(found._id);
      } else {
        const id = await ctx.db.insert("sandTypes", item);
        ids.push(id);
      }
    }
    return ids;
  },
});

export const listSandTypesWithUrls = query({
  args: {},
  handler: async (ctx) => {
    const sand = await ctx.db.query("sandTypes").collect();
    const withUrls = await Promise.all(
      sand.map(async (s) => {
        const url = s.imageStorageId
          ? await ctx.storage.getUrl(s.imageStorageId)
          : null;
        return { ...s, image: url ?? s.image };
      }),
    );
    return withUrls;
  },
});

export const bootstrap = query({
  args: {},
  handler: async (ctx) => {
    const [sand, dealers, trucks] = await Promise.all([
      ctx.db.query("sandTypes").collect(),
      ctx.db.query("dealers").collect(),
      ctx.db.query("trucks").collect(),
    ]);
    const sandWithUrls = await Promise.all(
      sand.map(async (s) => {
        const url = s.imageStorageId
          ? await ctx.storage.getUrl(s.imageStorageId)
          : null;
        return { ...s, image: url ?? s.image };
      }),
    );
    return { sandTypes: sandWithUrls, dealers, trucks };
  },
});

export const listDealers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("dealers").collect();
  },
});

export const listTrucks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("trucks").collect();
  },
});

export const seedDealers = mutation({
  args: {
    items: v.array(
      v.object({
        name: v.string(),
        location: v.string(),
        rating: v.number(),
        reviews: v.number(),
        bg: v.string(),
        priceMultiplier: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("dealers").collect();
    const byName = new Map(existing.map((d) => [d.name, d]));
    const ids: string[] = [];
    for (const item of args.items) {
      const found = byName.get(item.name);
      if (found) {
        await ctx.db.patch(found._id, { ...item });
        ids.push(found._id);
      } else {
        const id = await ctx.db.insert("dealers", item);
        ids.push(id);
      }
    }
    return ids;
  },
});

export const seedTrucks = mutation({
  args: {
    items: v.array(
      v.object({
        name: v.string(),
        icon: v.string(),
        capacity: v.string(),
        eta: v.string(),
        baseCost: v.number(),
        perTon: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("trucks").collect();
    const byName = new Map(existing.map((t) => [t.name, t]));
    const ids: string[] = [];
    for (const item of args.items) {
      const found = byName.get(item.name);
      if (found) {
        await ctx.db.patch(found._id, { ...item });
        ids.push(found._id);
      } else {
        const id = await ctx.db.insert("trucks", item);
        ids.push(id);
      }
    }
    return ids;
  },
});

export const createOrder = mutation({
  args: {
    orderNumber: v.string(),
    sandId: v.optional(v.id("sandTypes")),
    dealerId: v.optional(v.id("dealers")),
    truckId: v.optional(v.id("trucks")),
    sellerId: v.optional(v.id("users")),
    transporterId: v.optional(v.id("users")),
    sandName: v.string(),
    dealerName: v.string(),
    truckName: v.string(),
    quantity: v.number(),
    total: v.number(),
    paymentMethod: v.string(),
    address: v.string(),
    pickupLocation: v.optional(v.string()),
    distanceKm: v.optional(v.number()),
    deliveryWindow: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    if (args.quantity < 1 || args.quantity > 100) {
      throw new Error("Invalid quantity");
    }
    if (args.distanceKm !== undefined) {
      if (args.distanceKm < 1 || args.distanceKm > 500) {
        throw new Error("Invalid distance");
      }
    }
    const since = Date.now() - 60 * 1000;
    const recentOrders = await ctx.db
      .query("orders")
      .filter((q: any) => q.eq(q.field("userId"), userId))
      .filter((q: any) => q.gte(q.field("createdAt"), since))
      .collect();
    if (recentOrders.length >= 5) {
      throw new Error("Too many orders. Try again in a minute.");
    }
    if (args.sellerId) {
      const sellerRole = await ctx.db
        .query("userRoles")
        .withIndex("by_user", (q: any) => q.eq("userId", args.sellerId))
        .filter((q: any) => q.eq(q.field("role"), "seller"))
        .unique();
      if (!sellerRole) {
        throw new Error("Invalid seller");
      }
      if (args.sandId) {
        const listing = await ctx.db
          .query("sellerSandListings")
          .withIndex("by_sand", (q: any) => q.eq("sandId", args.sandId))
          .filter((q: any) => q.eq(q.field("sellerId"), args.sellerId))
          .unique();
        if (!listing) {
          throw new Error("Seller does not offer this sand");
        }
      }
    }
    if (args.transporterId) {
      const transporterRole = await ctx.db
        .query("userRoles")
        .withIndex("by_user", (q: any) => q.eq("userId", args.transporterId))
        .filter((q: any) => q.eq(q.field("role"), "transporter"))
        .unique();
      if (!transporterRole) {
        throw new Error("Invalid transporter");
      }
    }
    const deliveryWindow = args.deliveryWindow ?? "flexible";
    const windowMultiplier =
      deliveryWindow === "same-day"
        ? 1.15
        : deliveryWindow === "next-day"
          ? 1.05
          : 1;
    let sandUnitPrice = 0;
    if (args.sellerId && args.sandId) {
      const listing = await ctx.db
        .query("sellerSandListings")
        .withIndex("by_sand", (q: any) => q.eq("sandId", args.sandId))
        .filter((q: any) => q.eq(q.field("sellerId"), args.sellerId))
        .unique();
      if (listing) {
        sandUnitPrice = listing.price;
      }
    }
    if (!sandUnitPrice && args.sandId) {
      const sand = await ctx.db.get(args.sandId);
      if (sand) {
        sandUnitPrice = sand.price;
      }
    }
    const sandCost = sandUnitPrice * args.quantity;
    let baseCost = 2500;
    let perTon = 150;
    if (args.truckId) {
      const truck = await ctx.db.get(args.truckId);
      if (truck) {
        baseCost = truck.baseCost;
        perTon = truck.perTon;
      }
    }
    const transportCost = baseCost + perTon * args.quantity;
    const distanceFee = Math.round((args.distanceKm ?? 0) * 12);
    const windowFee = Math.round(
      (sandCost + transportCost) * (windowMultiplier - 1),
    );
    const subTotal = sandCost + transportCost + distanceFee + windowFee;
    const gst = Math.round(subTotal * 0.05);
    const computedTotal = subTotal + gst;
    if (!Number.isFinite(computedTotal) || computedTotal <= 0) {
      throw new Error("Invalid pricing");
    }
    const orderId = await ctx.db.insert("orders", {
      userId,
      orderNumber: args.orderNumber,
      sandId: args.sandId,
      dealerId: args.dealerId,
      truckId: args.truckId,
      sellerId: args.sellerId,
      transporterId: args.transporterId,
      sandName: args.sandName,
      dealerName: args.dealerName,
      truckName: args.truckName,
      quantity: args.quantity,
      total: computedTotal,
      paymentMethod: args.paymentMethod,
      address: args.address,
      pickupLocation: args.pickupLocation,
      distanceKm: args.distanceKm,
      deliveryWindow,
      status: "processing",
      createdAt: Date.now(),
    });
    await ctx.db.insert("orderTrackingUpdates", {
      orderId,
      status: "processing",
      message: "Order confirmed and queued for processing.",
      createdAt: Date.now(),
    });
    await ctx.scheduler.runAfter(2 * 60 * 1000, internal.sand.advanceOrderStatus, {
      orderId,
      nextStatus: "loading",
    });
    await ctx.scheduler.runAfter(8 * 60 * 1000, internal.sand.advanceOrderStatus, {
      orderId,
      nextStatus: "delivering",
    });
    await ctx.scheduler.runAfter(18 * 60 * 1000, internal.sand.advanceOrderStatus, {
      orderId,
      nextStatus: "delivered",
    });
    return orderId;
  },
});

export const advanceOrderStatus = internalMutation({
  args: {
    orderId: v.id("orders"),
    nextStatus: v.string(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order) {
      return;
    }
    if (order.status === "delivered") {
      return;
    }
    await ctx.db.patch(args.orderId, { status: args.nextStatus });
    await ctx.db.insert("orderTrackingUpdates", {
      orderId: args.orderId,
      status: args.nextStatus,
      message:
        args.nextStatus === "loading"
          ? "Loading started at the quarry."
          : args.nextStatus === "delivering"
            ? "Truck departed. On the way to your site."
            : "Order delivered.",
      createdAt: Date.now(),
    });
  },
});

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const order = await ctx.db.get(args.orderId);
    if (!order || order.userId !== userId) {
      throw new Error("Order not found");
    }
    const allowed = ["processing", "loading", "delivering", "delivered"];
    if (!allowed.includes(args.status)) {
      throw new Error("Invalid status");
    }
    const currentIndex = allowed.indexOf(order.status);
    const nextIndex = allowed.indexOf(args.status);
    if (nextIndex !== currentIndex + 1) {
      throw new Error("Invalid status transition");
    }
    await ctx.db.patch(args.orderId, { status: args.status });
    await ctx.db.insert("orderTrackingUpdates", {
      orderId: args.orderId,
      status: args.status,
      message: `Status updated to ${args.status}.`,
      createdAt: Date.now(),
    });
    return args.orderId;
  },
});

export const listOrders = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const listOrdersPaginated = query({
  args: {
    limit: v.number(),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { page: [], isDone: true, continueCursor: null };
    }
    const res = await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .paginate({
        cursor: args.cursor ?? null,
        numItems: Math.min(Math.max(args.limit, 1), 100),
      });
    return {
      page: res.page,
      isDone: res.isDone,
      continueCursor: res.continueCursor,
    };
  },
});
