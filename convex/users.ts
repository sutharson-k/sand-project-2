import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }
    return {
      _id: user._id,
      name: user.name ?? null,
      email: user.email ?? null,
      phone: user.phone ?? null,
      createdAt: user._creationTime ?? null,
    };
  },
});

export const profile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const authUser = await ctx.db.get(userId);
    const profileDoc = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    return {
      userId,
      name: profileDoc?.name ?? authUser?.name ?? "",
      email: profileDoc?.email ?? authUser?.email ?? "",
      phone: profileDoc?.phone ?? "",
    };
  },
});

export const upsertProfile = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        email: args.email,
        phone: args.phone,
      });
      return existing._id;
    }
    return await ctx.db.insert("userProfiles", {
      userId,
      name: args.name,
      email: args.email,
      phone: args.phone,
    });
  },
});

export const setPrefs = mutation({
  args: {
    location: v.string(),
    theme: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const existing = await ctx.db
      .query("userPrefs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, {
        location: args.location,
        theme: args.theme,
      });
      return existing._id;
    }
    return await ctx.db.insert("userPrefs", {
      userId,
      location: args.location,
      theme: args.theme,
    });
  },
});

export const getPrefs = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    return await ctx.db
      .query("userPrefs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
  },
});

export const listLocations = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    return await ctx.db
      .query("userLocations")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const addLocation = mutation({
  args: {
    label: v.string(),
    address: v.string(),
    makeDefault: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const existing = await ctx.db
      .query("userLocations")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    if (args.makeDefault) {
      for (const loc of existing) {
        if (loc.isDefault) {
          await ctx.db.patch(loc._id, { isDefault: false });
        }
      }
    }
    const id = await ctx.db.insert("userLocations", {
      userId,
      label: args.label,
      address: args.address,
      isDefault: args.makeDefault ?? existing.length === 0,
      createdAt: Date.now(),
    });
    const shouldUpdateDefault = args.makeDefault ?? existing.length === 0;
    if (shouldUpdateDefault) {
      const pref = await ctx.db
        .query("userPrefs")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .unique();
      if (pref) {
        await ctx.db.patch(pref._id, { location: args.address });
      } else {
        await ctx.db.insert("userPrefs", {
          userId,
          location: args.address,
          theme: "dark",
        });
      }
    }
    return id;
  },
});

export const setDefaultLocation = mutation({
  args: { locationId: v.id("userLocations") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const location = await ctx.db.get(args.locationId);
    if (!location || location.userId !== userId) {
      throw new Error("Location not found");
    }
    const existing = await ctx.db
      .query("userLocations")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    for (const loc of existing) {
      if (loc.isDefault && loc._id !== location._id) {
        await ctx.db.patch(loc._id, { isDefault: false });
      }
    }
    await ctx.db.patch(location._id, { isDefault: true });
    const pref = await ctx.db
      .query("userPrefs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (pref) {
      await ctx.db.patch(pref._id, { location: location.address });
    } else {
      await ctx.db.insert("userPrefs", {
        userId,
        location: location.address,
        theme: "dark",
      });
    }
    return { ok: true };
  },
});

export const removeLocation = mutation({
  args: { locationId: v.id("userLocations") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const location = await ctx.db.get(args.locationId);
    if (!location || location.userId !== userId) {
      throw new Error("Location not found");
    }
    await ctx.db.delete(args.locationId);
    if (location.isDefault) {
      const remaining = await ctx.db
        .query("userLocations")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .order("desc")
        .collect();
      const nextDefault = remaining[0];
      if (nextDefault) {
        await ctx.db.patch(nextDefault._id, { isDefault: true });
        const pref = await ctx.db
          .query("userPrefs")
          .withIndex("by_user", (q) => q.eq("userId", userId))
          .unique();
        if (pref) {
          await ctx.db.patch(pref._id, { location: nextDefault.address });
        } else {
          await ctx.db.insert("userPrefs", {
            userId,
            location: nextDefault.address,
            theme: "dark",
          });
        }
      }
    }
    return { ok: true };
  },
});

export const adminStatus = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { isAdmin: false };
    }
    const user = await ctx.db.get(userId);
    const email = user?.email ?? "";
    const allowlist = new Set([
      "dr24072007@gmail.com",
      "sutharsonmohan@gmail.com",
    ]);
    if (!allowlist.has(email)) {
      return { isAdmin: false };
    }
    const accounts = await ctx.db
      .query("authAccounts")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
    const hasGoogle = accounts.some((account) => account.provider === "google");
    return { isAdmin: hasGoogle };
  },
});
