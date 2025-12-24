import { notices, siteSettings, galleryImages, heroSlides, users, type Hero, type About, type Notice, type InsertNotice, type Branding, type GalleryImage, type InsertGalleryImage, type HeroSlide, type InsertHeroSlide, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  getHero(): Promise<Hero>;
  updateHero(hero: Hero): Promise<Hero>;
  getAbout(): Promise<About>;
  updateAbout(about: About): Promise<About>;
  getBranding(): Promise<Branding>;
  updateBranding(branding: Branding): Promise<Branding>;
  getNotices(): Promise<Notice[]>;
  createNotice(notice: InsertNotice): Promise<Notice>;
  updateNotice(id: number, notice: InsertNotice): Promise<Notice | null>;
  deleteNotice(id: number): Promise<boolean>;
  getGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: number, image: InsertGalleryImage): Promise<GalleryImage | null>;
  deleteGalleryImage(id: number): Promise<boolean>;
  getHeroSlides(): Promise<HeroSlide[]>;
  createHeroSlide(slide: InsertHeroSlide): Promise<HeroSlide>;
  updateHeroSlide(id: number, slide: InsertHeroSlide): Promise<HeroSlide | null>;
  deleteHeroSlide(id: number): Promise<boolean>;
  getUserByUsername(username: string): Promise<User | null>;
  validateUserPassword(username: string, password: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPassword(id: number, newPassword: string): Promise<boolean>;
  initializeDefaults(): Promise<void>;
}

const DEFAULT_HERO: Hero = {
  name: "মহজমপুর হাফিজিয়া এতিমখানা মাদরাসা",
  slogan: "কুরআন মাজিদ শিক্ষা কেন্দ্র",
  description: "দ্বীনি শিক্ষায় আদর্শ মানুষ গড়ার প্রত্যয়ে প্রতিষ্ঠিত",
  buttonText: "যোগাযোগ করুন",
};

const DEFAULT_ABOUT: About = {
  text: "মহজমপুর হাফিজিয়া এতিমখানা মাদরাসা ১৯৯০ সাল থেকে এতিম ও সাধারণ শিক্ষার্থীদের হিফজুল কুরআন ও নৈতিক শিক্ষা প্রদান করে আসছে। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে আদর্শ মানুষ ও সত্যিকারের মুসলিম হিসেবে গড়ে তোলা। এখানে শিক্ষার্থীরা পবিত্র কুরআন হিফজ করার পাশাপাশি ইসলামী আদব-কায়দা, নৈতিকতা এবং সমাজে কীভাবে একজন আদর্শ মানুষ হিসেবে বসবাস করতে হয় তা শেখে।",
  mission: "দ্বীনি শিক্ষার আলোয় আলোকিত করে প্রতিটি শিক্ষার্থীকে সমাজের জন্য উপযোগী, আদর্শ ও নৈতিক মানুষ হিসেবে গড়ে তোলা। আমরা বিশ্বাস করি প্রতিটি শিশুই আল্লাহর আমানত এবং তাদের সঠিক শিক্ষা ও পরিচর্যার মাধ্যমে উম্মাহর জন্য অবদান রাখতে সক্ষম।",
};

const DEFAULT_BRANDING: Branding = {
  siteName: "মহজমপুর হাফিজিয়া এতিমখানা মাদরাসা",
  logoUrl: "",
};

const DEFAULT_NOTICES: InsertNotice[] = [
  {
    title: "ভর্তি বিজ্ঞপ্তি ২০২৫",
    description: "নতুন শিক্ষাবর্ষের জন্য ভর্তি কার্যক্রম শুরু হয়েছে। এতিম ও সাধারণ শিক্ষার্থীদের জন্য আসন সংখ্যা সীমিত। আগ্রহী অভিভাবকগণ যোগাযোগ করুন।",
    date: "2025-01-15",
  },
  {
    title: "বার্ষিক পরীক্ষার সময়সূচি",
    description: "বার্ষিক পরীক্ষা আগামী মাসে অনুষ্ঠিত হবে। সকল শিক্ষার্থীদের প্রস্তুতি নেওয়ার জন্য অনুরোধ করা হচ্ছে।",
    date: "2025-02-01",
  },
  {
    title: "দোয়া ও মিলাদ মাহফিল",
    description: "আগামী শুক্রবার জোহরের নামাযের পর মাদ্রাসা প্রাঙ্গণে দোয়া ও মিলাদ মাহফিল অনুষ্ঠিত হবে। সকলকে উপস্থিত থাকার জন্য আমন্ত্রণ জানানো হচ্ছে।",
    date: "2024-12-20",
  },
];

export class DatabaseStorage implements IStorage {
  async initializeDefaults(): Promise<void> {
    // Check if hero settings exist
    const heroSetting = await db.select().from(siteSettings).where(eq(siteSettings.key, "hero"));
    if (heroSetting.length === 0) {
      await db.insert(siteSettings).values({
        key: "hero",
        value: JSON.stringify(DEFAULT_HERO),
      });
    }

    // Check if about settings exist
    const aboutSetting = await db.select().from(siteSettings).where(eq(siteSettings.key, "about"));
    if (aboutSetting.length === 0) {
      await db.insert(siteSettings).values({
        key: "about",
        value: JSON.stringify(DEFAULT_ABOUT),
      });
    }

    // Check if notices exist
    const existingNotices = await db.select().from(notices);
    if (existingNotices.length === 0) {
      for (const notice of DEFAULT_NOTICES) {
        await db.insert(notices).values(notice);
      }
    }
  }

  async getHero(): Promise<Hero> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, "hero"));
    if (!setting) return DEFAULT_HERO;
    return JSON.parse(setting.value) as Hero;
  }

  async updateHero(hero: Hero): Promise<Hero> {
    const [existing] = await db.select().from(siteSettings).where(eq(siteSettings.key, "hero"));
    if (existing) {
      await db.update(siteSettings).set({ value: JSON.stringify(hero) }).where(eq(siteSettings.key, "hero"));
    } else {
      await db.insert(siteSettings).values({ key: "hero", value: JSON.stringify(hero) });
    }
    return hero;
  }

  async getAbout(): Promise<About> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, "about"));
    if (!setting) return DEFAULT_ABOUT;
    return JSON.parse(setting.value) as About;
  }

  async updateAbout(about: About): Promise<About> {
    const [existing] = await db.select().from(siteSettings).where(eq(siteSettings.key, "about"));
    if (existing) {
      await db.update(siteSettings).set({ value: JSON.stringify(about) }).where(eq(siteSettings.key, "about"));
    } else {
      await db.insert(siteSettings).values({ key: "about", value: JSON.stringify(about) });
    }
    return about;
  }

  async getBranding(): Promise<Branding> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, "branding"));
    if (!setting) return DEFAULT_BRANDING;
    return JSON.parse(setting.value) as Branding;
  }

  async updateBranding(branding: Branding): Promise<Branding> {
    const [existing] = await db.select().from(siteSettings).where(eq(siteSettings.key, "branding"));
    if (existing) {
      await db.update(siteSettings).set({ value: JSON.stringify(branding) }).where(eq(siteSettings.key, "branding"));
    } else {
      await db.insert(siteSettings).values({ key: "branding", value: JSON.stringify(branding) });
    }
    return branding;
  }

  async getNotices(): Promise<Notice[]> {
    return await db.select().from(notices);
  }

  async createNotice(notice: InsertNotice): Promise<Notice> {
    const [newNotice] = await db.insert(notices).values(notice).returning();
    return newNotice;
  }

  async updateNotice(id: number, notice: InsertNotice): Promise<Notice | null> {
    const [updated] = await db.update(notices).set(notice).where(eq(notices.id, id)).returning();
    return updated || null;
  }

  async deleteNotice(id: number): Promise<boolean> {
    const result = await db.delete(notices).where(eq(notices.id, id)).returning();
    return result.length > 0;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages);
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const [newImage] = await db.insert(galleryImages).values(image).returning();
    return newImage;
  }

  async updateGalleryImage(id: number, image: InsertGalleryImage): Promise<GalleryImage | null> {
    const [updated] = await db.update(galleryImages).set(image).where(eq(galleryImages.id, id)).returning();
    return updated || null;
  }

  async deleteGalleryImage(id: number): Promise<boolean> {
    const result = await db.delete(galleryImages).where(eq(galleryImages.id, id)).returning();
    return result.length > 0;
  }

  async getHeroSlides(): Promise<HeroSlide[]> {
    return await db.select().from(heroSlides).orderBy(asc(heroSlides.sortOrder));
  }

  async createHeroSlide(slide: InsertHeroSlide): Promise<HeroSlide> {
    const [newSlide] = await db.insert(heroSlides).values(slide).returning();
    return newSlide;
  }

  async updateHeroSlide(id: number, slide: InsertHeroSlide): Promise<HeroSlide | null> {
    const [updated] = await db.update(heroSlides).set(slide).where(eq(heroSlides.id, id)).returning();
    return updated || null;
  }

  async deleteHeroSlide(id: number): Promise<boolean> {
    const result = await db.delete(heroSlides).where(eq(heroSlides.id, id)).returning();
    return result.length > 0;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || null;
  }

  async validateUserPassword(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async createUser(user: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [newUser] = await db.insert(users).values({
      ...user,
      password: hashedPassword,
    }).returning();
    return newUser;
  }

  async updateUserPassword(id: number, newPassword: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await db.update(users).set({ password: hashedPassword }).where(eq(users.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
