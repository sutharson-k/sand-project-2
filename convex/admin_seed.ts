import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const seedAdminRoles = mutation({
  args: { emails: v.array(v.string()) },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    const emailToId = new Map<string, Id<"users">>();
    for (const user of users) {
      if (user.email) {
        emailToId.set(user.email.toLowerCase(), user._id);
      }
    }
    const results: { email: string; status: string }[] = [];
    for (const email of args.emails) {
      const userId = emailToId.get(email.toLowerCase());
      if (!userId) {
        results.push({ email, status: "not_found" });
        continue;
      }
      const existing = await ctx.db
        .query("userRoles")
        .withIndex("by_user", (q: any) => q.eq("userId", userId))
        .filter((q: any) => q.eq(q.field("role"), "admin"))
        .unique();
      if (existing) {
        results.push({ email, status: "already_admin" });
        continue;
      }
      await ctx.db.insert("userRoles", { userId, role: "admin" });
      results.push({ email, status: "granted" });
    }
    return results;
  },
});
