import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

const ADMIN_EMAILS = new Set([
  "dr24072007@gmail.com",
  "sutharsonmohan@gmail.com",
]);

async function requireAdmin(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) return null;
  const user = await ctx.db.get(userId);
  if (!user?.email || !ADMIN_EMAILS.has(user.email)) return null;
  const accounts = await ctx.db
    .query("authAccounts")
    .filter((q: any) => q.eq(q.field("userId"), userId))
    .collect();
  const hasGoogle = accounts.some((account: any) => account.provider === "google");
  return hasGoogle ? userId : null;
}

export const adminSnapshot = query({
  args: {},
  handler: async (ctx) => {
    const adminId = await requireAdmin(ctx);
    if (!adminId) return { ok: false };

    const totalUsers = (await ctx.db.query("users").collect()).length;
    const totalOrders = (await ctx.db.query("orders").collect()).length;
    const totalSellers = (await ctx.db.query("sellerApplications").collect()).length;
    const totalTransport = (await ctx.db.query("transportApplications").collect()).length;
    const totalQuotes = (await ctx.db.query("quoteRequests").collect()).length;
    const latestOrders = await ctx.db.query("orders").order("desc").take(5);
    const latestQuotes = await ctx.db
      .query("quoteRequests")
      .order("desc")
      .take(5);
    const latestSellers = await ctx.db
      .query("sellerApplications")
      .filter((q) => q.eq(q.field("status"), "pending"))
      .order("desc")
      .collect();
    const latestTransporters = await ctx.db
      .query("transportApplications")
      .filter((q) => q.eq(q.field("status"), "pending"))
      .order("desc")
      .collect();
    const sellersWithDocs = await Promise.all(
      latestSellers.map(async (s: any) => {
        const docs = await Promise.all(
          (s.documents ?? []).map(async (d: any) => ({
            label: d.label,
            url: await ctx.storage.getUrl(d.storageId),
            storageId: d.storageId,
          })),
        );
        return { ...s, documents: docs };
      }),
    );
    const transportersWithDocs = await Promise.all(
      latestTransporters.map(async (t: any) => {
        const docs = await Promise.all(
          (t.documents ?? []).map(async (d: any) => ({
            label: d.label,
            url: await ctx.storage.getUrl(d.storageId),
            storageId: d.storageId,
          })),
        );
        return { ...t, documents: docs };
      }),
    );
    const auditLogs = await ctx.db
      .query("adminAuditLogs")
      .order("desc")
      .take(10);
    const sellers = await ctx.db.query("sellerProfiles").collect();
    const transporters = await ctx.db.query("transporterProfiles").collect();

    return {
      ok: true,
      totals: {
        users: totalUsers,
        orders: totalOrders,
        sellers: totalSellers,
        transporters: totalTransport,
        quotes: totalQuotes,
      },
      latestOrders,
      latestQuotes,
      latestSellers: sellersWithDocs,
      latestTransporters: transportersWithDocs,
      auditLogs,
      approvedSellers: sellers,
      approvedTransporters: transporters,
    };
  },
});

export const clearAuditLogs = mutation({
  args: {},
  handler: async (ctx) => {
    const adminId = await requireAdmin(ctx);
    if (!adminId) {
      throw new Error("Admin access only");
    }
    const logs = await ctx.db.query("adminAuditLogs").collect();
    for (const log of logs) {
      await ctx.db.delete(log._id);
    }
    return { ok: true };
  },
});

export const revokeSeller = mutation({
  args: { userId: v.id("users"), reason: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const adminId = await requireAdmin(ctx);
    if (!adminId) {
      throw new Error("Admin access only");
    }
    const roleDoc = await ctx.db
      .query("userRoles")
      .withIndex("by_user", (q: any) => q.eq("userId", args.userId))
      .filter((q: any) => q.eq(q.field("role"), "seller"))
      .unique();
    if (roleDoc) {
      await ctx.db.delete(roleDoc._id);
    }
    const profile = await ctx.db
      .query("sellerProfiles")
      .withIndex("by_user", (q: any) => q.eq("userId", args.userId))
      .unique();
    if (profile) {
      await ctx.db.delete(profile._id);
    }
    const listings = await ctx.db
      .query("sellerSandListings")
      .withIndex("by_seller", (q: any) => q.eq("sellerId", args.userId))
      .collect();
    for (const listing of listings) {
      await ctx.db.delete(listing._id);
    }
    await ctx.db.insert("adminAuditLogs", {
      actorId: adminId,
      action: "revoke",
      targetType: "seller",
      targetId: args.userId,
      status: "revoked",
      reason: args.reason,
      createdAt: Date.now(),
    });
    await ctx.db.insert("notifications", {
      userId: args.userId,
      message: `Your seller access was removed. ${args.reason ?? ""}`.trim(),
      read: false,
      createdAt: Date.now(),
    });
    return { ok: true };
  },
});

export const revokeTransporter = mutation({
  args: { userId: v.id("users"), reason: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const adminId = await requireAdmin(ctx);
    if (!adminId) {
      throw new Error("Admin access only");
    }
    const roleDoc = await ctx.db
      .query("userRoles")
      .withIndex("by_user", (q: any) => q.eq("userId", args.userId))
      .filter((q: any) => q.eq(q.field("role"), "transporter"))
      .unique();
    if (roleDoc) {
      await ctx.db.delete(roleDoc._id);
    }
    const profile = await ctx.db
      .query("transporterProfiles")
      .withIndex("by_user", (q: any) => q.eq("userId", args.userId))
      .unique();
    if (profile) {
      await ctx.db.delete(profile._id);
    }
    const vehicles = await ctx.db
      .query("transporterVehicles")
      .withIndex("by_transporter", (q: any) =>
        q.eq("transporterId", args.userId),
      )
      .collect();
    for (const vehicle of vehicles) {
      await ctx.db.delete(vehicle._id);
    }
    await ctx.db.insert("adminAuditLogs", {
      actorId: adminId,
      action: "revoke",
      targetType: "transporter",
      targetId: args.userId,
      status: "revoked",
      reason: args.reason,
      createdAt: Date.now(),
    });
    await ctx.db.insert("notifications", {
      userId: args.userId,
      message: `Your transport access was removed. ${args.reason ?? ""}`.trim(),
      read: false,
      createdAt: Date.now(),
    });
    return { ok: true };
  },
});

export const removeSandType = mutation({
  args: { sandId: v.id("sandTypes"), reason: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const adminId = await requireAdmin(ctx);
    if (!adminId) {
      throw new Error("Admin access only");
    }
    const sand = await ctx.db.get(args.sandId);
    if (!sand) {
      throw new Error("Sand not found");
    }
    const listings = await ctx.db
      .query("sellerSandListings")
      .withIndex("by_sand", (q: any) => q.eq("sandId", args.sandId))
      .collect();
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_sand", (q: any) => q.eq("sandId", args.sandId))
      .collect();
    for (const review of reviews) {
      await ctx.db.delete(review._id);
    }
    await ctx.db.delete(args.sandId);
    await ctx.db.insert("adminAuditLogs", {
      actorId: adminId,
      action: "remove",
      targetType: "sand",
      targetId: args.sandId,
      status: "removed",
      reason: args.reason,
      createdAt: Date.now(),
    });
    for (const listing of listings) {
      await ctx.db.insert("notifications", {
        userId: listing.sellerId,
        message: `A sand type you listed was removed. ${args.reason ?? ""}`.trim(),
        read: false,
        createdAt: Date.now(),
      });
    }
    for (const listing of listings) {
      await ctx.db.delete(listing._id);
    }
    return { ok: true };
  },
});
