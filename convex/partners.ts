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


const ALLOWED_CATEGORIES = new Set(["construction", "industrial", "landscaping", "specialty"]);
const ICON_RE = /^fa-[a-z0-9-]+$/i;
const COLOR_RE = /^(#[0-9a-f]{3,8}|linear-gradient\([a-z0-9#,%\.\s-]+\))$/i;

function createImageUrlResolver(ctx: any) {
  const cache = new Map<string, string | null>();
  return async (storageId?: string) => {
    if (!storageId) return null;
    if (cache.has(storageId)) {
      return cache.get(storageId) ?? null;
    }
    const url = await ctx.storage.getUrl(storageId as any);
    cache.set(storageId, url ?? null);
    return url ?? null;
  };
}

function normalizeCategory(value: string) {
  return value.trim().toLowerCase();
}

function validateSandInput(args: {
  category: string;
  icon?: string;
  color?: string;
  desc?: string;
  uses?: string;
}) {
  const category = normalizeCategory(args.category);
  if (!ALLOWED_CATEGORIES.has(category)) {
    throw new Error("Invalid category");
  }
  if (args.icon && !ICON_RE.test(args.icon.trim())) {
    throw new Error("Invalid icon");
  }
  if (args.color && !COLOR_RE.test(args.color.trim())) {
    throw new Error("Invalid color");
  }
  if (args.desc && args.desc.length > 500) {
    throw new Error("Description too long");
  }
  if (args.uses && args.uses.length > 300) {
    throw new Error("Uses too long");
  }
  return category;
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
    const getImageUrl = createImageUrlResolver(ctx);
    const results = await Promise.all(
      listings.map(async (l: any) => {
        const sandItem = sandById.get(l.sandId);
        const seller = sellerById.get(l.sellerId);
        if (!sandItem || !seller) return null;
        if (sandItem.status && sandItem.status !== "approved") return null;
        const now = Date.now();
        const nextRestock = l.nextRestockAt ? new Date(l.nextRestockAt) : null;
        const available =
          typeof l.availableTons === "number"
            ? l.availableTons > 0
            : true;
        const cutoffOk =
          typeof l.cutoffHour === "number"
            ? new Date(now).getHours() < l.cutoffHour
            : true;
        const listingImageUrl = await getImageUrl(l.imageStorageId);
        const sandImageUrl = await getImageUrl(sandItem.imageStorageId);
        return {
          listingId: l._id,
          sandId: l.sandId,
          sellerId: l.sellerId,
          price: l.price,
          availableTons: l.availableTons ?? null,
          cutoffHour: l.cutoffHour ?? null,
          nextRestockAt: l.nextRestockAt ?? null,
          availability: available && cutoffOk ? "available" : "limited",
          nextRestockLabel: nextRestock
            ? nextRestock.toLocaleDateString("en-IN")
            : null,
          company: seller.company,
          location: seller.location,
          image: listingImageUrl ?? sandImageUrl ?? sandItem.image ?? "",
          sand: sandItem,
        };
      }),
    );
    return results.filter(Boolean);
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

export const upsertSandListing = mutation({
  args: {
    sandId: v.optional(v.id("sandTypes")),
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
    const upsertListing = async (sandId: any, sandName: string) => {
      const existingListing = await ctx.db
        .query("sellerSandListings")
        .withIndex("by_seller", (q: any) => q.eq("sellerId", sellerId))
        .filter((q: any) => q.eq(q.field("sandId"), sandId))
        .unique();
      if (existingListing) {
        await ctx.db.patch(existingListing._id, {
          price: args.price,
          imageStorageId: args.imageStorageId,
        });
        await ctx.db.insert("notifications", {
          userId: sellerId,
          message: `Your sand listing for ${sandName} was updated.`,
          read: false,
          createdAt: Date.now(),
        });
        return existingListing._id;
      }
      return await ctx.db.insert("sellerSandListings", {
        sellerId,
        sandId,
        price: args.price,
        imageStorageId: args.imageStorageId,
        createdAt: Date.now(),
      });
    };
    if (args.sandId) {
      const sand = await ctx.db.get(args.sandId);
      if (!sand || sand.status !== "approved") {
        throw new Error("Sand type not available");
      }
      return await upsertListing(args.sandId, sand.name);
    }
    const normalizedCategory = validateSandInput({
      category: args.category,
      icon: args.icon,
      color: args.color,
      desc: args.desc,
      uses: args.uses,
    });
    const found = await ctx.db
      .query("sandTypes")
      .withIndex("by_name_category", (q: any) =>
        q.eq("name", args.name.trim()).eq("category", normalizedCategory),
      )
      .unique();
    const sandData = {
      name: args.name,
      category: normalizedCategory,
      color: args.color ?? "linear-gradient(135deg,#C2B280,#A89060)",
      image: args.image || "",
      imageStorageId: args.imageStorageId,
      status: "pending",
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
          await ctx.db.patch(found._id, {
            ...sandData,
            status: found.status ?? "pending",
          });
          return found._id;
        })()
      : await ctx.db.insert("sandTypes", sandData);
    return await upsertListing(sandId, args.name);
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
    const id = await ctx.db.insert("transporterVehicles", {
      transporterId,
      label: args.label,
      capacity: args.capacity,
      vehicleType: args.vehicleType,
    });
    await ctx.db.insert("notifications", {
      userId: transporterId,
      message: `Vehicle added: ${args.label}`,
      read: false,
      createdAt: Date.now(),
    });
    return id;
  },
});

export const updateListingInventory = mutation({
  args: {
    listingId: v.id("sellerSandListings"),
    availableTons: v.optional(v.number()),
    cutoffHour: v.optional(v.number()),
    nextRestockAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const sellerId = await requireRole(ctx, "seller");
    const listing = await ctx.db.get(args.listingId);
    if (!listing || listing.sellerId !== sellerId) {
      throw new Error("Listing not found");
    }
    await ctx.db.patch(args.listingId, {
      availableTons: args.availableTons,
      cutoffHour: args.cutoffHour,
      nextRestockAt: args.nextRestockAt,
    });
    await ctx.db.insert("notifications", {
      userId: sellerId,
      message: "Inventory updated for your listing.",
      read: false,
      createdAt: Date.now(),
    });
    return { ok: true };
  },
});
