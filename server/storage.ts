import { notices, siteSettings, type Hero, type About, type Notice, type InsertNotice } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getHero(): Promise<Hero>;
  updateHero(hero: Hero): Promise<Hero>;
  getAbout(): Promise<About>;
  updateAbout(about: About): Promise<About>;
  getNotices(): Promise<Notice[]>;
  createNotice(notice: InsertNotice): Promise<Notice>;
  updateNotice(id: number, notice: InsertNotice): Promise<Notice | null>;
  deleteNotice(id: number): Promise<boolean>;
  initializeDefaults(): Promise<void>;
}

const DEFAULT_HERO: Hero = {
  name: "মহাজামপুর হাফিজিয়া এতিমখানা মাদ্রাসা",
  slogan: "দ্বীনি শিক্ষায় আদর্শ মানুষ গড়ার প্রত্যয়ে",
  description: "একটি অরাজনৈতিক ও অলাভজনক হিফজ মাদ্রাসা ও এতিমখানা",
  buttonText: "যোগাযোগ করুন",
};

const DEFAULT_ABOUT: About = {
  text: "মহাজামপুর হাফিজিয়া এতিমখানা মাদ্রাসা ১৯৯০ সাল থেকে এতিম ও সাধারণ শিক্ষার্থীদের হিফজুল কুরআন ও নৈতিক শিক্ষা প্রদান করে আসছে। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে আদর্শ মানুষ ও সত্যিকারের মুসলিম হিসেবে গড়ে তোলা। এখানে শিক্ষার্থীরা পবিত্র কুরআন হিফজ করার পাশাপাশি ইসলামী আদব-কায়দা, নৈতিকতা এবং সমাজে কীভাবে একজন আদর্শ মানুষ হিসেবে বসবাস করতে হয় তা শেখে।",
  mission: "দ্বীনি শিক্ষার আলোয় আলোকিত করে প্রতিটি শিক্ষার্থীকে সমাজের জন্য উপযোগী, আদর্শ ও নৈতিক মানুষ হিসেবে গড়ে তোলা। আমরা বিশ্বাস করি প্রতিটি শিশুই আল্লাহর আমানত এবং তাদের সঠিক শিক্ষা ও পরিচর্যার মাধ্যমে উম্মাহর জন্য অবদান রাখতে সক্ষম।",
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
}

export const storage = new DatabaseStorage();
