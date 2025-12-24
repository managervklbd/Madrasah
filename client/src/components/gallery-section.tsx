import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ImageIcon, X, Play, Star, Facebook, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import type { GalleryImage } from "@shared/schema";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

function isEmbedUrl(url: string): boolean {
  return (
    url.includes("facebook.com") ||
    url.includes("fb.com") ||
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("vimeo.com")
  );
}

function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  return null;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`;
  }
  return null;
}

function getYouTubeThumbnail(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return null;
}

function getFacebookEmbedUrl(url: string): string {
  const encodedUrl = encodeURIComponent(url);
  return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false`;
}

export function GallerySection() {
  const { data: images, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const featuredItems = images?.filter((img) => img.isFeatured === "true") || [];
  const regularItems = images?.filter((img) => img.isFeatured !== "true") || [];
  const sortedItems = [...featuredItems, ...regularItems];

  const renderVideoEmbed = (url: string, autoplay: boolean = false) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const embedUrl = getYouTubeEmbedUrl(url);
      if (embedUrl) {
        return (
          <iframe
            src={autoplay ? embedUrl : embedUrl.replace("autoplay=1", "autoplay=0")}
            className="w-full h-full"
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
    }
    
    if (url.includes("facebook.com") || url.includes("fb.com")) {
      return (
        <iframe
          src={getFacebookEmbedUrl(url)}
          className="w-full h-full"
          style={{ border: "none" }}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      );
    }
    
    return null;
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            ফটো ও ভিডিও গ্যালারি
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            মাদরাসার কিছু মুহূর্ত
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        ) : !images || images.length === 0 ? (
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="py-12">
              <ImageIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">কোন মিডিয়া নেই</h3>
              <p className="text-muted-foreground">
                শীঘ্রই মাদরাসার ছবি ও ভিডিও যোগ করা হবে।
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-3 sm:gap-4">
                {sortedItems.map((image) => (
                  <div 
                    key={image.id} 
                    className="flex-[0_0_50%] min-w-0 sm:flex-[0_0_calc(33.333%-11px)] lg:flex-[0_0_calc(25%-12px)]"
                  >
                    <Card
                      className="group overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                      onClick={() => setSelectedImage(image)}
                      data-testid={`card-gallery-${image.id}`}
                    >
                      <div className="aspect-square relative overflow-hidden">
                        {image.mediaType === "video" ? (
                          <>
                            {(image.imageUrl.includes("youtube.com") || image.imageUrl.includes("youtu.be")) ? (
                              <img
                                src={getYouTubeThumbnail(image.imageUrl) || ""}
                                alt={image.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://placehold.co/400x400/1f2937/ffffff?text=Video";
                                }}
                              />
                            ) : (image.imageUrl.includes("facebook.com") || image.imageUrl.includes("fb.com")) ? (
                              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center gap-2">
                                <Facebook className="h-10 w-10 text-white" />
                                <span className="text-white/80 text-xs font-medium">Facebook Video</span>
                              </div>
                            ) : isEmbedUrl(image.imageUrl) ? (
                              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                <Play className="h-12 w-12 text-white/70" />
                              </div>
                            ) : (
                              <video
                                src={image.imageUrl}
                                className="w-full h-full object-cover"
                                muted
                                preload="metadata"
                                onLoadedData={(e) => {
                                  const video = e.target as HTMLVideoElement;
                                  video.currentTime = 0.1;
                                }}
                              />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                                <Play className="h-6 w-6 text-white ml-1" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <img
                            src={image.imageUrl}
                            alt={image.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/400x400/0d9488/ffffff?text=ছবি";
                            }}
                          />
                        )}
                        {image.isFeatured === "true" && (
                          <div className="absolute top-2 right-2">
                            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                          <p className="font-semibold text-sm line-clamp-1">{image.title}</p>
                          {image.caption && (
                            <p className="text-xs text-white/80 line-clamp-1">{image.caption}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {sortedItems.length > 4 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className="rounded-full"
                  data-testid="button-gallery-prev"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className="rounded-full"
                  data-testid="button-gallery-next"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
              onClick={() => setSelectedImage(null)}
              data-testid="button-close-lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <div
              className="max-w-4xl w-full max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.mediaType === "video" ? (
                isEmbedUrl(selectedImage.imageUrl) ? (
                  <div className="aspect-video w-full">
                    {renderVideoEmbed(selectedImage.imageUrl, true)}
                  </div>
                ) : (
                  <video
                    src={selectedImage.imageUrl}
                    className="max-w-full max-h-[80vh] rounded-lg mx-auto"
                    controls
                    autoPlay
                    playsInline
                  />
                )
              ) : (
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg mx-auto"
                />
              )}
              <div className="mt-4 text-center text-white">
                <h3 className="font-semibold text-lg">{selectedImage.title}</h3>
                {selectedImage.caption && (
                  <p className="text-white/80 mt-1">{selectedImage.caption}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
