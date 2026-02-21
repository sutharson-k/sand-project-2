import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

function windowMultiplier(window: string) {
  if (window === "same-day") return 1.15;
  if (window === "next-day") return 1.05;
  return 1;
}

export const calculatePrice = mutation({
  args: {
    listingId: v.id("sellerSandListings"),
    transporterId: v.optional(v.id("users")),
    truckId: v.optional(v.id("trucks")),
    quantity: v.number(),
    distanceKm: v.number(),
    deliveryWindow: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const listing = await ctx.db.get(args.listingId);
    if (!listing) {
      throw new Error("Listing not found");
    }
    const sandCost = listing.price * args.quantity;
    let baseCost = 2500;
    let perTon = 150;
    if (args.truckId) {
      const truck = await ctx.db.get(args.truckId);
      if (truck) {
        baseCost = truck.baseCost;
        perTon = truck.perTon;
      }
    }
    const transportCost = baseCost + perTon * args.quantity;
    const distanceFee = Math.round(args.distanceKm * 12);
    const windowFee = Math.round(
      (sandCost + transportCost) * (windowMultiplier(args.deliveryWindow) - 1),
    );
    const subTotal = sandCost + transportCost + distanceFee + windowFee;
    const gst = Math.round(subTotal * 0.05);
    const total = subTotal + gst;
    return {
      sandCost,
      transportCost,
      distanceFee,
      windowFee,
      gst,
      total,
    };
  },
});
