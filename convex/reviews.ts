import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const submitReview = mutation({
  args: {
    orderId: v.id("orders"),
    rating: v.number(),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Invalid rating");
    }
    const order = await ctx.db.get(args.orderId);
    if (!order || order.userId !== userId) {
      throw new Error("Order not found");
    }
    if (order.status !== "delivered") {
      throw new Error("Order not delivered");
    }
    const existing = await ctx.db
      .query("reviews")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .unique();
    if (existing) {
      throw new Error("Review already submitted");
    }
    const reviewId = await ctx.db.insert("reviews", {
      userId,
      orderId: args.orderId,
      sellerId: order.sellerId,
      transporterId: order.transporterId,
      sandId: order.sandId,
      rating: args.rating,
      comment: args.comment,
      createdAt: Date.now(),
    });
    if (order.sellerId) {
      await ctx.db.insert("notifications", {
        userId: order.sellerId,
        message: `You received a ${args.rating}-star review.`,
        read: false,
        createdAt: Date.now(),
      });
    }
    if (order.transporterId) {
      await ctx.db.insert("notifications", {
        userId: order.transporterId,
        message: `You received a ${args.rating}-star review.`,
        read: false,
        createdAt: Date.now(),
      });
    }
    return reviewId;
  },
});

export const listReviewsForSand = query({
  args: { sandId: v.id("sandTypes") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .withIndex("by_sand", (q) => q.eq("sandId", args.sandId))
      .order("desc")
      .take(10);
  },
});

export const listReviewsForSandPaginated = query({
  args: {
    sandId: v.id("sandTypes"),
    limit: v.number(),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const res = await ctx.db
      .query("reviews")
      .withIndex("by_sand", (q) => q.eq("sandId", args.sandId))
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
