import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { NoticesSection } from "@/components/notices-section";
import { DonationSection } from "@/components/donation-section";
import { GallerySection } from "@/components/gallery-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <DonationSection />
        <NoticesSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
