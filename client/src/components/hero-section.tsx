import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@shared/schema";
import { useState, useEffect, useCallback } from "react";

function isEmbedUrl(url: string): boolean {
  return (
    url.includes("facebook.com") ||
    url.includes("fb.com") ||
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("vimeo.com")
  );
}

function getYouTubeEmbedUrl(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}&controls=0&showinfo=0`;
  }
  return null;
}

function getFacebookEmbedUrl(url: string): string {
  const encodedUrl = encodeURIComponent(url);
  return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&autoplay=true&muted=true`;
}

export function HeroSection() {
  const { data: slides, isLoading } = useQuery<HeroSlide[]>({
    queryKey: ["/api/hero-slides"],
  });

  const [currentSlide, setCurrentSlide] = useState(0);
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

  const handleButtonClick = (link?: string | null) => {
    if (link) {
      if (link.startsWith("#")) {
        const element = document.getElementById(link.slice(1));
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else if (link.startsWith("http")) {
        window.open(link, "_blank");
      } else {
        window.location.href = link;
      }
    } else {
      const element = document.getElementById("contact");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderMedia = (slide: HeroSlide) => {
    const url = slide.mediaUrl;
    
    if (slide.mediaType === "video" && isEmbedUrl(url)) {
      let embedSrc = url;
      
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        embedSrc = getYouTubeEmbedUrl(url) || url;
      } else if (url.includes("facebook.com") || url.includes("fb.com")) {
        embedSrc = getFacebookEmbedUrl(url);
      }
      
      return (
        <iframe
          src={embedSrc}
          className="w-full h-full object-cover absolute inset-0"
          style={{ border: "none", minHeight: "100%", minWidth: "100%" }}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      );
    }
    
    if (slide.mediaType === "video") {
      return (
        <video
          src={url}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }
    
    return (
      <img
        src={url}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  };

  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#1a6b5c] via-[#1a7a6d] to-[#0d4a40]">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="max-w-2xl space-y-6">
            <Skeleton className="h-8 w-32 bg-white/20" />
            <Skeleton className="h-16 w-full bg-white/20" />
            <Skeleton className="h-24 w-3/4 bg-white/20" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-36 bg-white/20" />
              <Skeleton className="h-12 w-36 bg-white/20" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!hasSlides) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a6b5c] via-[#1a7a6d] to-[#0d4a40]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <div className="max-w-2xl pt-20">
            <Badge className="mb-6 bg-primary/90 text-primary-foreground border-0">
              কুরআন মাজিদ শিক্ষা কেন্দ্র
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
              মহজমপুর হাফিজিয়া এতিমখানা মাদরাসা
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed" data-testid="text-hero-description">
              দ্বীনি শিক্ষায় আদর্শ মানুষ গড়ার প্রত্যয়ে প্রতিষ্ঠিত। এতিম ও সাধারণ শিক্ষার্থীদের হিফজুল কুরআন ও নৈতিক শিক্ষা প্রদান করে আসছে।
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => handleButtonClick("#contact")}
                data-testid="button-hero-cta"
              >
                যোগাযোগ করুন
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
                onClick={() => handleButtonClick("#about")}
                data-testid="button-hero-secondary"
              >
                আরও জানুন
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>
    );
  }

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {renderMedia(slide)}
        </div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="max-w-2xl pt-20">
          {activeSlide.badgeText && (
            <Badge 
              className="mb-6 bg-primary/90 text-primary-foreground border-0"
              data-testid="badge-hero-slide"
            >
              {activeSlide.badgeText}
            </Badge>
          )}
          
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            {activeSlide.title}
          </h1>
          
          {activeSlide.description && (
            <p 
              className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed"
              data-testid="text-hero-description"
            >
              {activeSlide.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => handleButtonClick(activeSlide.buttonLink)}
              data-testid="button-hero-cta"
            >
              {activeSlide.buttonText || "যোগাযোগ করুন"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
              onClick={() => handleButtonClick("#about")}
              data-testid="button-hero-secondary"
            >
              আরও জানুন
            </Button>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
            data-testid="button-slide-prev"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
            data-testid="button-slide-next"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                data-testid={`button-slide-dot-${index}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
