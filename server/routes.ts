import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { heroSchema, aboutSchema, insertNoticeSchema, loginSchema, brandingSchema, insertGalleryImageSchema } from "@shared/schema";

// Admin credentials from environment variables with secure defaults
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized. Please login first." });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Initialize default data
  try {
    await storage.initializeDefaults();
    console.log("Database initialized with default data");
  } catch (error) {
    console.log("Database initialization skipped or already done");
  }

  // Auth endpoints
  app.post("/api/auth/login", async (req, res) => {
    try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid credentials format" });
      }

      const { username, password } = result.data;
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        req.session.isAdmin = true;
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Logout failed" });
      } else {
        res.json({ success: true, message: "Logged out" });
      }
    });
  });

  app.get("/api/auth/check", (req, res) => {
    res.json({ isAuthenticated: !!req.session?.isAdmin });
  });

  // Public endpoints
  app.get("/api/hero", async (req, res) => {
    try {
      const hero = await storage.getHero();
      res.json(hero);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hero data" });
    }
  });

  app.get("/api/about", async (req, res) => {
    try {
      const about = await storage.getAbout();
      res.json(about);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch about data" });
    }
  });

  app.get("/api/notices", async (req, res) => {
    try {
      const notices = await storage.getNotices();
      res.json(notices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notices" });
    }
  });

  app.get("/api/branding", async (req, res) => {
    try {
      const branding = await storage.getBranding();
      res.json(branding);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch branding" });
    }
  });

  // Protected endpoints (require authentication)
  app.post("/api/hero", requireAuth, async (req, res) => {
    try {
      const result = heroSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
      }
      const hero = await storage.updateHero(result.data);
      res.json(hero);
    } catch (error) {
      res.status(500).json({ error: "Failed to update hero data" });
    }
  });

  app.post("/api/about", requireAuth, async (req, res) => {
    try {
      const result = aboutSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
      }
      const about = await storage.updateAbout(result.data);
      res.json(about);
    } catch (error) {
      res.status(500).json({ error: "Failed to update about data" });
    }
  });

  app.post("/api/branding", requireAuth, async (req, res) => {
    try {
      const result = brandingSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
      }
      const branding = await storage.updateBranding(result.data);
      res.json(branding);
    } catch (error) {
      res.status(500).json({ error: "Failed to update branding" });
    }
  });

  app.post("/api/notices", requireAuth, async (req, res) => {
    try {
      const result = insertNoticeSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
      }
      const notice = await storage.createNotice(result.data);
      res.status(201).json(notice);
    } catch (error) {
      res.status(500).json({ error: "Failed to create notice" });
    }
  });

  app.put("/api/notices/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid notice ID" });
      }

      const result = insertNoticeSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
      }

      const notice = await storage.updateNotice(id, result.data);
      if (!notice) {
        return res.status(404).json({ error: "Notice not found" });
      }
      res.json(notice);
    } catch (error) {
      res.status(500).json({ error: "Failed to update notice" });
    }
  });

  app.delete("/api/notices/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid notice ID" });
      }

      const deleted = await storage.deleteNotice(id);
      if (!deleted) {
        return res.status(404).json({ error: "Notice not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete notice" });
    }
  });

  // Gallery endpoints
  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  app.post("/api/gallery", requireAuth, async (req, res) => {
    try {
      const result = insertGalleryImageSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
      }
      const image = await storage.createGalleryImage(result.data);
      res.status(201).json(image);
    } catch (error) {
      res.status(500).json({ error: "Failed to create gallery image" });
    }
  });

  app.put("/api/gallery/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid image ID" });
      }

      const result = insertGalleryImageSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
      }

      const image = await storage.updateGalleryImage(id, result.data);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.json(image);
    } catch (error) {
      res.status(500).json({ error: "Failed to update gallery image" });
    }
  });

  app.delete("/api/gallery/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid image ID" });
      }

      const deleted = await storage.deleteGalleryImage(id);
      if (!deleted) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete gallery image" });
    }
  });

  return httpServer;
}
