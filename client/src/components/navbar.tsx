import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Menu, X, Phone, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import defaultLogo from "@assets/image_1766561812238.png";
import type { Branding } from "@shared/schema";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const { data: branding } = useQuery<Branding>({
    queryKey: ["/api/branding"],
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "হোম" },
    { href: "/#about", label: "আমাদের সম্পর্কে" },
    { href: "/#notices", label: "নোটিশ বোর্ড" },
    { href: "/#contact", label: "যোগাযোগ" },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const logoSrc = branding?.logoUrl || defaultLogo;
  const siteNameParts = (branding?.siteName || "মহাজামপুর হাফিজিয়া এতিমখানা মাদ্রাসা").split(" ");
  const firstLine = siteNameParts.slice(0, 2).join(" ");
  const secondLine = siteNameParts.slice(2).join(" ");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3">
            <img
              src={logoSrc}
              alt="মাদ্রাসা লোগো"
              className="h-12 lg:h-14 w-auto"
              data-testid="img-logo"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultLogo;
              }}
            />
            <div className="hidden sm:block">
              <h1 className={`text-sm lg:text-base font-semibold leading-tight ${isScrolled ? "" : "text-white drop-shadow-lg"}`}>
                {firstLine}
              </h1>
              <p className={`text-xs lg:text-sm ${isScrolled ? "text-muted-foreground" : "text-white/80 drop-shadow"}`}>
                {secondLine}
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className={`text-sm font-medium ${
                  isScrolled ? "" : "text-white hover:bg-white/10"
                }`}
                onClick={() => scrollToSection(link.href)}
                data-testid={`link-nav-${link.href.replace(/[/#]/g, "") || "home"}`}
              >
                {link.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:01728825819"
              className="hidden lg:flex items-center gap-2"
            >
              <Button variant={isScrolled ? "outline" : "secondary"} size="sm">
                <Phone className="h-4 w-4 mr-1" />
                ০১৭২৮-৮২৫৮১৯
              </Button>
            </a>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className={`h-5 w-5 ${isScrolled ? "" : "text-white"}`} />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className="w-full justify-start text-base"
                onClick={() => scrollToSection(link.href)}
                data-testid={`link-mobile-nav-${link.href.replace(/[/#]/g, "") || "home"}`}
              >
                {link.label}
              </Button>
            ))}
            <div className="pt-4 border-t border-border flex gap-2">
              <a href="tel:01728825819" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  কল করুন
                </Button>
              </a>
              <a
                href="https://facebook.com/mhem1990"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="default" className="w-full">
                  <Facebook className="h-4 w-4 mr-2" />
                  ফেসবুক
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
