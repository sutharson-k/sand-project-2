import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

async function requireUser(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new Error("Not authenticated");
  }
  return userId;
}

async function requireRole(ctx: any, role: "seller" | "transporter") {
  const userId = await requireUser(ctx);
  const roleDoc = await ctx.db
    .query("userRoles")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .filter((q: any) => q.eq(q.field("role"), role))
    .unique();
  if (!roleDoc) {
    throw new Error("Not approved");
  }
  return userId;
}

export const myPartnerStatus = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { seller: false, transporter: false };
    }
    const roles = await ctx.db
      .query("userRoles")
      .withIndex("by_user", (q: any) => q.eq("userId", userId))
      .collect();
    return {
      seller: roles.some((r: any) => r.role === "seller"),
      transporter: roles.some((r: any) => r.role === "transporter"),
    };
  },
});

export const listSellerListings = query({
  args: {},
  handler: async (ctx) => {
    const listings = await ctx.db.query("sellerSandListings").collect();
    const sand = await ctx.db.query("sandTypes").collect();
    const sandById = new Map(sand.map((s: any) => [s._id, s]));
    const sellers = await ctx.db.query("sellerProfiles").collect();
    const sellerById = new Map(sellers.map((s: any) => [s.userId, s]));
    return listings
      .map((l: any) => {
        const sandItem = sandById.get(l.sandId);
        const seller = sellerById.get(l.sellerId);
        if (!sandItem || !seller) return null;
        return {
          listingId: l._id,
          sandId: l.sandId,
          sellerId: l.sellerId,
          price: l.price,
          company: seller.company,
          location: seller.location,
          sand: sandItem,
        };
      })
      .filter(Boolean);
  },
});

export const listTransporters = query({
  args: {},
  handler: async (ctx) => {
    const profiles = await ctx.db.query("transporterProfiles").collect();
    const vehicles = await ctx.db.query("transporterVehicles").collect();
    const byTransporter = new Map<string, any[]>();
    for (const v of vehicles) {
      const existing = byTransporter.get(v.transporterId) ?? [];
      existing.push(v);
      byTransporter.set(v.transporterId, existing);
    }
    return profiles.map((p: any) => ({
      transporterId: p.userId,
      company: p.company,
      baseLocation: p.baseLocation,
      vehicles: byTransporter.get(p.userId) ?? [],
      capacity:
        (byTransporter.get(p.userId) ?? [])[0]?.capacity ?? "Custom capacity",
      baseCost: 2500,
      perTon: 150,
      eta: "Same day",
      icon: "fa-truck",
    }));
  },
});

export const createSandTypeAndListing = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    price: v.number(),
    image: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
    color: v.optional(v.string()),
    grain: v.optional(v.string()),
    moisture: v.optional(v.string()),
    density: v.optional(v.string()),
    origin: v.optional(v.string()),
    icon: v.optional(v.string()),
    desc: v.optional(v.string()),
    uses: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const sellerId = await requireRole(ctx, "seller");
    if (!args.imageStorageId) {
      throw new Error("Image upload required");
    }
    const existing = await ctx.db.query("sandTypes").collect();
    const found = existing.find(
      (s: any) =>
        s.name.toLowerCase().trim() === args.name.toLowerCase().trim() &&
        s.category.toLowerCase().trim() === args.category.toLowerCase().trim(),
    );
    const sandData = {
      name: args.name,
      category: args.category,
      color: args.color ?? "linear-gradient(135deg,#C2B280,#A89060)",
      image: args.image || "",
      imageStorageId: args.imageStorageId,
      price: args.price,
      grain: args.grain ?? "0.5 - 2mm",
      moisture: args.moisture ?? "2-5%",
      density: args.density ?? "1600 kg/m³",
      origin: args.origin ?? "Local quarry",
      icon: args.icon ?? "fa-mountain",
      desc:
        args.desc ??
        "High-quality construction sand supplied by verified partners.",
      uses: args.uses ?? "Construction, Plastering, Brickwork",
    };
    const sandId = found
      ? await (async () => {
          await ctx.db.patch(found._id, sandData);
          return found._id;
        })()
      : await ctx.db.insert("sandTypes", sandData);

    const existingListing = await ctx.db
      .query("sellerSandListings")
      .withIndex("by_seller", (q: any) => q.eq("sellerId", sellerId))
      .filter((q: any) => q.eq(q.field("sandId"), sandId))
      .unique();
    if (existingListing) {
      await ctx.db.patch(existingListing._id, { price: args.price });
      return existingListing._id;
    }
    return await ctx.db.insert("sellerSandListings", {
      sellerId,
      sandId,
      price: args.price,
      createdAt: Date.now(),
    });
  },
});

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireRole(ctx, "seller");
    return await ctx.storage.generateUploadUrl();
  },
});

export const listSellerDashboard = query({
  args: {},
  handler: async (ctx) => {
    const sellerId = await requireRole(ctx, "seller");
    const profile = await ctx.db
      .query("sellerProfiles")
      .withIndex("by_user", (q: any) => q.eq("userId", sellerId))
      .unique();
    const listings = await ctx.db
      .query("sellerSandListings")
      .withIndex("by_seller", (q: any) => q.eq("sellerId", sellerId))
      .collect();
    const sand = await ctx.db.query("sandTypes").collect();
    const sandById = new Map(sand.map((s: any) => [s._id, s]));
    const orders = await ctx.db
      .query("orders")
      .filter((q: any) => q.eq(q.field("sellerId"), sellerId))
      .order("desc")
      .collect();
    const listingDetails = listings.map((l: any) => ({
      ...l,
      sand: sandById.get(l.sandId),
    }));
    return { profile, listings: listingDetails, orders };
  },
});

export const listTransporterDashboard = query({
  args: {},
  handler: async (ctx) => {
    const transporterId = await requireRole(ctx, "transporter");
    const profile = await ctx.db
      .query("transporterProfiles")
      .withIndex("by_user", (q: any) => q.eq("userId", transporterId))
      .unique();
    const vehicles = await ctx.db
      .query("transporterVehicles")
      .withIndex("by_transporter", (q: any) => q.eq("transporterId", transporterId))
      .collect();
    const orders = await ctx.db
      .query("orders")
      .filter((q: any) => q.eq(q.field("transporterId"), transporterId))
      .order("desc")
      .collect();
    return { profile, vehicles, orders };
  },
});

export const addTransporterVehicle = mutation({
  args: {
    label: v.string(),
    capacity: v.string(),
    vehicleType: v.string(),
  },
  handler: async (ctx, args) => {
    const transporterId = await requireRole(ctx, "transporter");
    return await ctx.db.insert("transporterVehicles", {
      transporterId,
      label: args.label,
      capacity: args.capacity,
      vehicleType: args.vehicleType,
    });
  },
});
