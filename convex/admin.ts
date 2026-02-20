import { query } from "./_generated/server";
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
    const latestOrders = await ctx.db.query("orders").order("desc").take(5);
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
    const auditLogs = await ctx.db
      .query("adminAuditLogs")
      .order("desc")
      .take(10);

    return {
      ok: true,
      totals: {
        users: totalUsers,
        orders: totalOrders,
        sellers: totalSellers,
        transporters: totalTransport,
      },
      latestOrders,
      latestSellers,
      latestTransporters,
      auditLogs,
    };
  },
});
