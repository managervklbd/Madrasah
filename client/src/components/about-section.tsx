import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Target, BookOpen, GraduationCap, Heart } from "lucide-react";
import type { About } from "@shared/schema";

export function AboutSection() {
  const { data: about, isLoading } = useQuery<About>({
    queryKey: ["/api/about"],
  });

  const features = [
    {
      icon: BookOpen,
      title: "কুরআন শিক্ষা",
      description: "তাজবীদ ও তারতীলসহ কুরআন শিক্ষা",
    },
    {
      icon: GraduationCap,
      title: "হিফজ প্রোগ্রাম",
      description: "সম্পূর্ণ কুরআন মুখস্থ করার সুবর্ণ সুযোগ",
    },
    {
      icon: Heart,
      title: "এতিম সেবা",
      description: "এতিম শিশুদের সম্পূর্ণ বিনামূল্যে শিক্ষা ও থাকা-খাওয়া",
    },
    {
      icon: Target,
      title: "নৈতিক শিক্ষা",
      description: "ইসলামী আদর্শ ও চরিত্র গঠনমূলক শিক্ষা",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            আমাদের সম্পর্কে
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            মহজমপুর হাফিজিয়া এতিমখানা মাদ্রাসা
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            {isLoading ? (
              <>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-6 w-full" />
              </>
            ) : (
              <>
                <p
                  className="text-lg text-muted-foreground leading-relaxed"
                  data-testid="text-about-description"
                >
                  {about?.text ||
                    "এখানে এতিম ও সাধারণ শিক্ষার্থীদের হিফজুল কুরআন ও নৈতিক শিক্ষা প্রদান করা হয়। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে আদর্শ মানুষ ও সত্যিকারের মুসলিম হিসেবে গড়ে তোলা।"}
                </p>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          আমাদের লক্ষ্য
                        </h3>
                        <p
                          className="text-muted-foreground"
                          data-testid="text-about-mission"
                        >
                          {about?.mission ||
                            "দ্বীনি শিক্ষার আলোয় আলোকিত করে প্রতিটি শিক্ষার্থীকে সমাজের জন্য উপযোগী, আদর্শ ও নৈতিক মানুষ হিসেবে গড়ে তোলা।"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group transition-all duration-200 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">১৯৯০</div>
              <div className="text-muted-foreground text-sm">প্রতিষ্ঠাকাল</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">৫০০+</div>
              <div className="text-muted-foreground text-sm">শিক্ষার্থী</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">১৫০+</div>
              <div className="text-muted-foreground text-sm">এতিম শিশু</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">২০+</div>
              <div className="text-muted-foreground text-sm">শিক্ষক</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
