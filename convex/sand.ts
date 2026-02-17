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
    sandName: v.string(),
    dealerName: v.string(),
    truckName: v.string(),
    quantity: v.number(),
    total: v.number(),
    paymentMethod: v.string(),
    address: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const orderId = await ctx.db.insert("orders", {
      userId,
      orderNumber: args.orderNumber,
      sandId: args.sandId,
      dealerId: args.dealerId,
      truckId: args.truckId,
      sandName: args.sandName,
      dealerName: args.dealerName,
      truckName: args.truckName,
      quantity: args.quantity,
      total: args.total,
      paymentMethod: args.paymentMethod,
      address: args.address,
      status: "processing",
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
    await ctx.db.patch(args.orderId, { status: args.status });
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
