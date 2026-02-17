import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const submitSellerApplication = mutation({
  args: {
    company: v.string(),
    contactName: v.string(),
    phone: v.string(),
    email: v.string(),
    location: v.string(),
    details: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
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
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
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
    });
  },
});

export const listSellerApplications = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("sellerApplications").order("desc").collect();
  },
});

export const listTransportApplications = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("transportApplications").order("desc").collect();
  },
});

export const updateSellerApplicationStatus = mutation({
  args: {
    applicationId: v.id("sellerApplications"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.applicationId, { status: args.status });
    return args.applicationId;
  },
});

export const updateTransportApplicationStatus = mutation({
  args: {
    applicationId: v.id("transportApplications"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.applicationId, { status: args.status });
    return args.applicationId;
  },
});
