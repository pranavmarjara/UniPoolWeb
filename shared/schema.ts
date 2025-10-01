import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  university: text("university").notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  rating: integer("rating").default(0),
  ridesCompleted: integer("rides_completed").notNull().default(0),
  memberSince: timestamp("member_since").notNull().defaultNow(),
});

export const carpoolRequests = pgTable("carpool_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  pickupLocation: text("pickup_location").notNull(),
  destination: text("destination").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  passengers: integer("passengers").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const carpoolInvites = pgTable("carpool_invites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  pickupLocation: text("pickup_location").notNull(),
  destination: text("destination").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  availableSeats: integer("available_seats").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  memberSince: true,
  ridesCompleted: true,
  rating: true,
});

export const insertCarpoolRequestSchema = createInsertSchema(carpoolRequests).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertCarpoolInviteSchema = createInsertSchema(carpoolInvites).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type CarpoolRequest = typeof carpoolRequests.$inferSelect;
export type CarpoolInvite = typeof carpoolInvites.$inferSelect;
export type InsertCarpoolRequest = z.infer<typeof insertCarpoolRequestSchema>;
export type InsertCarpoolInvite = z.infer<typeof insertCarpoolInviteSchema>;
