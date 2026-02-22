import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const seedAdminRoles = mutation({
  args: { emails: v.array(v.string()) },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    const emailToIds = new Map<string, Id<"users">[]>();
    for (const user of users) {
      if (user.email) {
        const key = user.email.toLowerCase();
        const existing = emailToIds.get(key) ?? [];
        existing.push(user._id);
        emailToIds.set(key, existing);
      }
    }
    const results: { email: string; status: string }[] = [];
    for (const email of args.emails) {
      const userIds = emailToIds.get(email.toLowerCase()) ?? [];
      if (userIds.length === 0) {
        results.push({ email, status: "not_found" });
        continue;
      }
      let granted = 0;
      for (const userId of userIds) {
        const existing = await ctx.db
          .query("userRoles")
          .withIndex("by_user", (q: any) => q.eq("userId", userId))
          .filter((q: any) => q.eq(q.field("role"), "admin"))
          .unique();
        if (existing) {
          continue;
        }
        await ctx.db.insert("userRoles", { userId, role: "admin" });
        granted += 1;
      }
      results.push({
        email,
        status: granted > 0 ? "granted" : "already_admin",
      });
    }
    return results;
  },
});

export const listAdminRoles = query({
  args: {},
  handler: async (ctx) => {
    const roles = await ctx.db
      .query("userRoles")
      .filter((q) => q.eq(q.field("role"), "admin"))
      .collect();
    const users = await ctx.db.query("users").collect();
    const userById = new Map(users.map((u) => [u._id, u]));
    return roles.map((r) => ({
      userId: r.userId,
      email: userById.get(r.userId)?.email ?? null,
    }));
  },
});

export const findUsersByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    return users
      .filter((u) => (u.email ?? "").toLowerCase() === args.email.toLowerCase())
      .map((u) => ({ userId: u._id, email: u.email, name: u.name ?? null }));
  },
});
