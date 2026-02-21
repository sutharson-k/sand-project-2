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

async function enforceRateLimit(ctx: any, userId: string, table: "sellerApplications" | "transportApplications") {
  const since = Date.now() - 60 * 1000;
  const recent = await ctx.db
    .query(table)
    .filter((q: any) => q.eq(q.field("userId"), userId))
    .filter((q: any) => q.gte(q.field("createdAt"), since))
    .collect();
  if (recent.length >= 5) {
    throw new Error("Too many requests. Try again in a minute.");
  }
}

export const submitSellerApplication = mutation({
  args: {
    company: v.string(),
    contactName: v.string(),
    phone: v.string(),
    email: v.string(),
    location: v.string(),
    details: v.string(),
    documents: v.optional(
      v.array(
        v.object({
          label: v.string(),
          storageId: v.id("_storage"),
        }),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    await enforceRateLimit(ctx, userId, "sellerApplications");
    return await ctx.db.insert("sellerApplications", {
      userId,
      company: args.company,
      contactName: args.contactName,
      phone: args.phone,
      email: args.email,
      location: args.location,
      details: args.details,
      status: "pending",
      createdAt: Date.now(),
      documents: args.documents ?? [],
    });
  },
});

export const submitTransportApplication = mutation({
  args: {
    company: v.string(),
    contactName: v.string(),
    phone: v.string(),
    email: v.string(),
    vehicleType: v.string(),
    capacity: v.string(),
    baseLocation: v.string(),
    documents: v.optional(
      v.array(
        v.object({
          label: v.string(),
          storageId: v.id("_storage"),
        }),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    await enforceRateLimit(ctx, userId, "transportApplications");
    return await ctx.db.insert("transportApplications", {
      userId,
      company: args.company,
      contactName: args.contactName,
      phone: args.phone,
      email: args.email,
      vehicleType: args.vehicleType,
      capacity: args.capacity,
      baseLocation: args.baseLocation,
      status: "pending",
      createdAt: Date.now(),
      documents: args.documents ?? [],
    });
  },
});

export const generateApplicationUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const listSellerApplications = query({
  args: {},
  handler: async (ctx) => {
    const adminId = await requireAdmin(ctx);
    if (!adminId) {
      throw new Error("Admin access only");
    }
    return await ctx.db.query("sellerApplications").order("desc").collect();
  },
});

export const listTransportApplications = query({
  args: {},
  handler: async (ctx) => {
    const adminId = await requireAdmin(ctx);
    if (!adminId) {
      throw new Error("Admin access only");
    }
    return await ctx.db.query("transportApplications").order("desc").collect();
  },
});

export const updateSellerApplicationStatus = mutation({
  args: {
    applicationId: v.id("sellerApplications"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const adminId = await requireAdmin(ctx);
    if (!adminId) {
      throw new Error("Admin access only");
    }
    const allowed = new Set(["pending", "approved", "rejected"]);
    if (!allowed.has(args.status)) {
      throw new Error("Invalid status");
    }
    await ctx.db.patch(args.applicationId, { status: args.status });
    if (args.status === "approved") {
      const app = await ctx.db.get(args.applicationId);
      if (app) {
        const existingProfile = await ctx.db
          .query("sellerProfiles")
          .withIndex("by_user", (q) => q.eq("userId", app.userId))
          .unique();
        if (!existingProfile) {
          await ctx.db.insert("sellerProfiles", {
            userId: app.userId,
            company: app.company,
            location: app.location,
            phone: app.phone,
            email: app.email,
          });
        }
        const existingRole = await ctx.db
          .query("userRoles")
          .withIndex("by_user", (q) => q.eq("userId", app.userId))
          .filter((q) => q.eq(q.field("role"), "seller"))
          .unique();
        if (!existingRole) {
          await ctx.db.insert("userRoles", {
            userId: app.userId,
            role: "seller",
          });
        }
      }
    }
    if (args.status === "rejected") {
      const app = await ctx.db.get(args.applicationId);
      if (app) {
        const roleDoc = await ctx.db
          .query("userRoles")
          .withIndex("by_user", (q: any) => q.eq("userId", app.userId))
          .filter((q: any) => q.eq(q.field("role"), "seller"))
          .unique();
        if (roleDoc) {
          await ctx.db.delete(roleDoc._id);
        }
        const profile = await ctx.db
          .query("sellerProfiles")
          .withIndex("by_user", (q: any) => q.eq("userId", app.userId))
          .unique();
        if (profile) {
          await ctx.db.delete(profile._id);
        }
        const listings = await ctx.db
          .query("sellerSandListings")
          .withIndex("by_seller", (q: any) => q.eq("sellerId", app.userId))
          .collect();
        for (const listing of listings) {
          await ctx.db.delete(listing._id);
        }
      }
    }
    await ctx.db.insert("adminAuditLogs", {
      actorId: adminId,
      action: "update_status",
      targetType: "seller_application",
      targetId: args.applicationId,
      status: args.status,
      createdAt: Date.now(),
    });
    return args.applicationId;
  },
});

export const updateTransportApplicationStatus = mutation({
  args: {
    applicationId: v.id("transportApplications"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const adminId = await requireAdmin(ctx);
    if (!adminId) {
      throw new Error("Admin access only");
    }
    const allowed = new Set(["pending", "approved", "rejected"]);
    if (!allowed.has(args.status)) {
      throw new Error("Invalid status");
    }
    await ctx.db.patch(args.applicationId, { status: args.status });
    if (args.status === "approved") {
      const app = await ctx.db.get(args.applicationId);
      if (app) {
        const existingProfile = await ctx.db
          .query("transporterProfiles")
          .withIndex("by_user", (q) => q.eq("userId", app.userId))
          .unique();
        if (!existingProfile) {
          await ctx.db.insert("transporterProfiles", {
            userId: app.userId,
            company: app.company,
            baseLocation: app.baseLocation,
            phone: app.phone,
            email: app.email,
          });
        }
        const existingRole = await ctx.db
          .query("userRoles")
          .withIndex("by_user", (q) => q.eq("userId", app.userId))
          .filter((q) => q.eq(q.field("role"), "transporter"))
          .unique();
        if (!existingRole) {
          await ctx.db.insert("userRoles", {
            userId: app.userId,
            role: "transporter",
          });
        }
        const existingVehicle = await ctx.db
          .query("transporterVehicles")
          .withIndex("by_transporter", (q) => q.eq("transporterId", app.userId))
          .unique();
        if (!existingVehicle) {
          await ctx.db.insert("transporterVehicles", {
            transporterId: app.userId,
            label: app.company,
            capacity: app.capacity,
            vehicleType: app.vehicleType,
          });
        }
      }
    }
    if (args.status === "rejected") {
      const app = await ctx.db.get(args.applicationId);
      if (app) {
        const roleDoc = await ctx.db
          .query("userRoles")
          .withIndex("by_user", (q: any) => q.eq("userId", app.userId))
          .filter((q: any) => q.eq(q.field("role"), "transporter"))
          .unique();
        if (roleDoc) {
          await ctx.db.delete(roleDoc._id);
        }
        const profile = await ctx.db
          .query("transporterProfiles")
          .withIndex("by_user", (q: any) => q.eq("userId", app.userId))
          .unique();
        if (profile) {
          await ctx.db.delete(profile._id);
        }
        const vehicles = await ctx.db
          .query("transporterVehicles")
          .withIndex("by_transporter", (q: any) => q.eq("transporterId", app.userId))
          .collect();
        for (const vehicle of vehicles) {
          await ctx.db.delete(vehicle._id);
        }
      }
    }
    await ctx.db.insert("adminAuditLogs", {
      actorId: adminId,
      action: "update_status",
      targetType: "transport_application",
      targetId: args.applicationId,
      status: args.status,
      createdAt: Date.now(),
    });
    return args.applicationId;
  },
});
