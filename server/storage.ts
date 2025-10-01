import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, desc } from "drizzle-orm";
import { 
  users, 
  carpoolRequests, 
  carpoolInvites,
  type User, 
  type InsertUser,
  type CarpoolRequest,
  type CarpoolInvite,
  type InsertCarpoolRequest,
  type InsertCarpoolInvite
} from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createCarpoolRequest(request: InsertCarpoolRequest): Promise<CarpoolRequest>;
  getCarpoolRequests(): Promise<CarpoolRequest[]>;
  getCarpoolRequestById(id: string): Promise<CarpoolRequest | undefined>;
  
  createCarpoolInvite(invite: InsertCarpoolInvite): Promise<CarpoolInvite>;
  getCarpoolInvites(): Promise<CarpoolInvite[]>;
  getCarpoolInviteById(id: string): Promise<CarpoolInvite | undefined>;
  
  getActiveRequestsCount(): Promise<number>;
  getActiveInvitesCount(): Promise<number>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createCarpoolRequest(request: InsertCarpoolRequest): Promise<CarpoolRequest> {
    const result = await db.insert(carpoolRequests).values(request).returning();
    return result[0];
  }

  async getCarpoolRequests(): Promise<CarpoolRequest[]> {
    return await db.select().from(carpoolRequests).orderBy(desc(carpoolRequests.createdAt));
  }

  async getCarpoolRequestById(id: string): Promise<CarpoolRequest | undefined> {
    const result = await db.select().from(carpoolRequests).where(eq(carpoolRequests.id, id)).limit(1);
    return result[0];
  }

  async createCarpoolInvite(invite: InsertCarpoolInvite): Promise<CarpoolInvite> {
    const result = await db.insert(carpoolInvites).values(invite).returning();
    return result[0];
  }

  async getCarpoolInvites(): Promise<CarpoolInvite[]> {
    return await db.select().from(carpoolInvites).orderBy(desc(carpoolInvites.createdAt));
  }

  async getCarpoolInviteById(id: string): Promise<CarpoolInvite | undefined> {
    const result = await db.select().from(carpoolInvites).where(eq(carpoolInvites.id, id)).limit(1);
    return result[0];
  }

  async getActiveRequestsCount(): Promise<number> {
    const result = await db.select().from(carpoolRequests).where(eq(carpoolRequests.status, "active"));
    return result.length;
  }

  async getActiveInvitesCount(): Promise<number> {
    const result = await db.select().from(carpoolInvites).where(eq(carpoolInvites.status, "active"));
    return result.length;
  }
}

export const storage = new DbStorage();
