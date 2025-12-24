import { Link } from "wouter";
import { Phone, MapPin, Facebook, Heart, Mail } from "lucide-react";
import logoImage from "@assets/image_1766561812238.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img
                src={logoImage}
                alt="মাদ্রাসা লোগো"
                className="h-12 w-auto"
              />
              <div>
                <h3 className="font-semibold text-sm">মহজমপুর হাফিজিয়া</h3>
                <p className="text-xs text-muted-foreground">এতিমখানা মাদরাসা</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              কুরআন মাজিদ শিক্ষা কেন্দ্র - দ্বীনি শিক্ষায় আদর্শ মানুষ গড়ার প্রত্যয়ে প্রতিষ্ঠিত।
            </p>
            <div className="text-sm text-muted-foreground">
              <p>প্রতিষ্ঠিত: ১৯৯০ ইং</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">দ্রুত লিংক</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-home"
                >
                  হোম
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-about"
                >
                  আমাদের সম্পর্কে
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("notices")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-notices"
                >
                  নোটিশ বোর্ড
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-contact"
                >
                  যোগাযোগ
                </button>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-admin"
                >
                  অ্যাডমিন প্যানেল
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">যোগাযোগ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">
                  মহজমপুর, ময়মনসিংহ সদর
                  <br />
                  ময়মনসিংহ, বাংলাদেশ
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="tel:01883525652"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ০১৮৮৩-৫২৫৬৫২
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:mohojompureatimkhana1990@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                >
                  mohojompureatimkhana1990@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Facebook className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="https://www.facebook.com/kamheatimkhanamadrasah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  @kamheatimkhanamadrasah
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">কর্মসময়</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>শনিবার - বৃহস্পতিবার</span>
              </li>
              <li className="flex justify-between">
                <span>সকাল ৯:০০ - সন্ধ্যা ৬:০০</span>
              </li>
              <li className="flex justify-between pt-2 border-t border-border mt-2">
                <span>শুক্রবার</span>
                <span className="text-destructive">বন্ধ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              &copy; {currentYear} মহজমপুর হাফিজিয়া এতিমখানা মাদরাসা। সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="flex items-center gap-1">
              Developed by{" "}
              <a 
                href="https://maxtechbd.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Maxtechbd.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
