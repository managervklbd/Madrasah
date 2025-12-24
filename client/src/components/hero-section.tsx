import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Users, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import defaultLogo from "@assets/image_1766561812238.png";
import type { Hero, Branding, HeroSlide } from "@shared/schema";
import { useState, useEffect, useCallback } from "react";

export function HeroSection() {
  const { data: hero, isLoading } = useQuery<Hero>({
    queryKey: ["/api/hero"],
  });

  const { data: branding } = useQuery<Branding>({
    queryKey: ["/api/branding"],
  });

  const { data: slides } = useQuery<HeroSlide[]>({
    queryKey: ["/api/hero-slides"],
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const logoSrc = branding?.logoUrl || defaultLogo;
  const hasSlides = slides && slides.length > 0;

  const nextSlide = useCallback(() => {
    if (hasSlides) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  }, [hasSlides, slides?.length]);

  const prevSlide = useCallback(() => {
    if (hasSlides) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  }, [hasSlides, slides?.length]);

  useEffect(() => {
    if (!hasSlides) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [hasSlides, nextSlide]);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {hasSlides ? (
        <>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {slide.mediaType === "video" ? (
                <video
                  src={slide.mediaUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={slide.mediaUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          
          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                data-testid="button-slide-prev"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                data-testid="button-slide-next"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
              
              <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    data-testid={`button-slide-dot-${index}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a6b5c] via-[#1a7a6d] to-[#0d4a40]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-16 pt-24 sm:py-24 sm:pt-32">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-110" />
            <img
              src={logoSrc}
              alt="মাদ্রাসা লোগো"
              className="relative h-24 sm:h-32 lg:h-40 w-auto drop-shadow-2xl"
              data-testid="img-hero-logo"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultLogo;
              }}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto bg-white/20" />
            <Skeleton className="h-8 w-2/3 mx-auto bg-white/20" />
            <Skeleton className="h-6 w-1/2 mx-auto bg-white/20" />
          </div>
        ) : (
          <>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 drop-shadow-lg leading-tight"
              data-testid="text-hero-name"
            >
              {hero?.name || "মহজমপুর হাফিজিয়া এতিমখানা মাদ্রাসা"}
            </h1>
            <p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-orange-300 font-semibold mb-6 drop-shadow"
              data-testid="text-hero-slogan"
            >
              {hero?.slogan || "দ্বীনি শিক্ষায় আদর্শ মানুষ গড়ার প্রত্যয়ে"}
            </p>
            <p
              className="text-base sm:text-lg lg:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow"
              data-testid="text-hero-description"
            >
              {hero?.description ||
                "একটি অরাজনৈতিক ও অলাভজনক হিফজ মাদ্রাসা ও এতিমখানা"}
            </p>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white border-orange-600 text-base lg:text-lg px-8"
            onClick={scrollToContact}
            data-testid="button-hero-cta"
          >
            {hero?.buttonText || "যোগাযোগ করুন"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 text-base lg:text-lg px-8"
            onClick={() => {
              const element = document.getElementById("about");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="button-hero-learn-more"
          >
            আরও জানুন
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <BookOpen className="h-8 w-8 text-orange-300 mx-auto mb-3" />
            <h3 className="text-white font-semibold text-lg mb-1">হিফজুল কুরআন</h3>
            <p className="text-white/70 text-sm">পবিত্র কুরআন মুখস্থ শিক্ষা</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <Users className="h-8 w-8 text-orange-300 mx-auto mb-3" />
            <h3 className="text-white font-semibold text-lg mb-1">নৈতিক শিক্ষা</h3>
            <p className="text-white/70 text-sm">চরিত্র গঠন ও আদর্শ জীবন</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <Heart className="h-8 w-8 text-orange-300 mx-auto mb-3" />
            <h3 className="text-white font-semibold text-lg mb-1">এতিম সেবা</h3>
            <p className="text-white/70 text-sm">এতিমদের লালন-পালন ও শিক্ষা</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
