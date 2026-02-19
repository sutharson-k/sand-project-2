import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const ADMIN_EMAILS = new Set([
  "dr24072007@gmail.com",
  "sutharsonmohan@gmail.com",
]);

async function requireAdmin(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    return null;
  }
  const user = await ctx.db.get(userId);
  if (!user?.email || !ADMIN_EMAILS.has(user.email)) {
    return null;
  }
  const accounts = await ctx.db
    .query("authAccounts")
    .filter((q: any) => q.eq(q.field("userId"), userId))
    .collect();
  const hasGoogle = accounts.some((account: any) => account.provider === "google");
  return hasGoogle ? userId : null;
}

export const adminBundle = query({
  args: {},
  handler: async (ctx) => {
    const adminId = await requireAdmin(ctx);
    if (!adminId) {
      return { ok: false };
    }

    const [
      users,
      orders,
      sellerApps,
      transportApps,
    ] = await Promise.all([
      ctx.db.query("users").order("desc").take(20),
      ctx.db.query("orders").order("desc").take(20),
      ctx.db.query("sellerApplications").order("desc").take(20),
      ctx.db.query("transportApplications").order("desc").take(20),
    ]);

    const totalUsers = (await ctx.db.query("users").collect()).length;
    const totalOrders = (await ctx.db.query("orders").collect()).length;
    const totalSellers = (await ctx.db.query("sellerApplications").collect()).length;
    const totalTransport = (await ctx.db.query("transportApplications").collect()).length;

    const statusCounts = {
      processing: 0,
      loading: 0,
      delivering: 0,
      delivered: 0,
    } as Record<string, number>;
    for (const order of orders) {
      statusCounts[order.status] = (statusCounts[order.status] ?? 0) + 1;
    }

    return {
      ok: true,
      totals: {
        users: totalUsers,
        orders: totalOrders,
        sellers: totalSellers,
        transporters: totalTransport,
      },
      orders,
      users,
      sellerApps,
      transportApps,
      analytics: statusCounts,
    };
  },
});
