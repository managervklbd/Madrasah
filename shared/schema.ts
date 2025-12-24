import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Site settings table for hero and about content
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 50 }).notNull().unique(),
  value: text("value").notNull(),
});

// Notices table
export const notices = pgTable("notices", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: varchar("date", { length: 20 }).notNull(),
});

export const insertNoticeSchema = createInsertSchema(notices).omit({ id: true });
export type Notice = typeof notices.$inferSelect;
export type InsertNotice = z.infer<typeof insertNoticeSchema>;

// Gallery items table (images and videos)
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  mediaType: varchar("media_type", { length: 10 }).notNull().default("image"),
  isFeatured: varchar("is_featured", { length: 5 }).notNull().default("false"),
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({ id: true });
export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;

// Hero slides table (multiple images/videos for carousel)
export const heroSlides = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  mediaUrl: text("media_url").notNull(),
  mediaType: varchar("media_type", { length: 10 }).notNull().default("image"),
  sortOrder: serial("sort_order"),
});

export const insertHeroSlideSchema = createInsertSchema(heroSlides).omit({ id: true, sortOrder: true });
export type HeroSlide = typeof heroSlides.$inferSelect;
export type InsertHeroSlide = z.infer<typeof insertHeroSlideSchema>;

// Zod schemas for validation
export const heroSchema = z.object({
  name: z.string(),
  slogan: z.string(),
  description: z.string(),
  buttonText: z.string(),
});

export const aboutSchema = z.object({
  text: z.string(),
  mission: z.string(),
});

export const brandingSchema = z.object({
  siteName: z.string(),
  logoUrl: z.string().optional(),
});

export type Hero = z.infer<typeof heroSchema>;
export type About = z.infer<typeof aboutSchema>;
export type Branding = z.infer<typeof brandingSchema>;

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
