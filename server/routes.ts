import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCarpoolRequestSchema, insertCarpoolInviteSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Carpool Requests endpoints
  app.post("/api/carpool-requests", async (req, res) => {
    try {
      const validatedData = insertCarpoolRequestSchema.parse(req.body);
      const request = await storage.createCarpoolRequest(validatedData);
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.get("/api/carpool-requests", async (req, res) => {
    try {
      const requests = await storage.getCarpoolRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch requests" });
    }
  });

  app.get("/api/carpool-requests/:id", async (req, res) => {
    try {
      const request = await storage.getCarpoolRequestById(req.params.id);
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }
      res.json(request);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch request" });
    }
  });

  // Carpool Invites endpoints
  app.post("/api/carpool-invites", async (req, res) => {
    try {
      const validatedData = insertCarpoolInviteSchema.parse(req.body);
      const invite = await storage.createCarpoolInvite(validatedData);
      res.json(invite);
    } catch (error) {
      res.status(400).json({ error: "Invalid invite data" });
    }
  });

  app.get("/api/carpool-invites", async (req, res) => {
    try {
      const invites = await storage.getCarpoolInvites();
      res.json(invites);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invites" });
    }
  });

  app.get("/api/carpool-invites/:id", async (req, res) => {
    try {
      const invite = await storage.getCarpoolInviteById(req.params.id);
      if (!invite) {
        return res.status(404).json({ error: "Invite not found" });
      }
      res.json(invite);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invite" });
    }
  });

  // Dashboard statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const [activeRequests, activeInvites] = await Promise.all([
        storage.getActiveRequestsCount(),
        storage.getActiveInvitesCount(),
      ]);
      res.json({
        activeRequests,
        activeInvites,
        ridesCompleted: 0, // This would require tracking completed rides
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
