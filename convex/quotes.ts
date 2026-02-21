import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const submitQuoteRequest = mutation({
  args: {
    sandId: v.optional(v.id("sandTypes")),
    sellerId: v.optional(v.id("users")),
    quantity: v.number(),
    deliveryWindow: v.string(),
    address: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    if (args.quantity < 1) {
      throw new Error("Invalid quantity");
    }
    const id = await ctx.db.insert("quoteRequests", {
      userId,
      sandId: args.sandId,
      sellerId: args.sellerId,
      quantity: args.quantity,
      deliveryWindow: args.deliveryWindow,
      address: args.address,
      notes: args.notes,
      status: "pending",
      createdAt: Date.now(),
    });
    if (args.sellerId) {
      await ctx.db.insert("notifications", {
        userId: args.sellerId,
        message: "New bulk quote request received.",
        read: false,
        createdAt: Date.now(),
      });
    }
    return id;
  },
});

export const listMyQuoteRequests = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    return await ctx.db
      .query("quoteRequests")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});
