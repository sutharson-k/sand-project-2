import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const listOrderTracking = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    const order = await ctx.db.get(args.orderId);
    if (!order || order.userId !== userId) {
      return [];
    }
    return await ctx.db
      .query("orderTrackingUpdates")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .order("desc")
      .take(20);
  },
});

export const listOrderTrackingPaginated = query({
  args: {
    orderId: v.id("orders"),
    limit: v.number(),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { page: [], isDone: true, continueCursor: null };
    }
    const order = await ctx.db.get(args.orderId);
    if (!order || order.userId !== userId) {
      return { page: [], isDone: true, continueCursor: null };
    }
    const res = await ctx.db
      .query("orderTrackingUpdates")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .order("desc")
      .paginate({
        cursor: args.cursor ?? null,
        numItems: Math.min(Math.max(args.limit, 1), 50),
      });
    return {
      page: res.page,
      isDone: res.isDone,
      continueCursor: res.continueCursor,
    };
  },
});

export const addTrackingUpdate = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.string(),
    message: v.string(),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    etaMinutes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const order = await ctx.db.get(args.orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.userId !== userId && order.transporterId !== userId) {
      throw new Error("Not authorized");
    }
    return await ctx.db.insert("orderTrackingUpdates", {
      orderId: args.orderId,
      status: args.status,
      message: args.message,
      lat: args.lat,
      lng: args.lng,
      etaMinutes: args.etaMinutes,
      createdAt: Date.now(),
    });
  },
});
