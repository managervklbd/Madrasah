import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Heart, HandHeart, Gift } from "lucide-react";

export function DonationSection() {
  return (
    <section id="donation" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            দান-সদকা
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            এতিমদের পাশে দাঁড়ান
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-xl shrink-0">
                    <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl mb-3">আপনার দানে একজন এতিমের জীবন বদলে যেতে পারে</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      আল্লাহ তা'আলা বলেন: "তোমরা যা কিছু ব্যয় কর, আল্লাহ তা জানেন।" (সূরা বাকারা: ২৭৩)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              মহজমপুর হাফিজিয়া এতিমখানা মাদরাসায় ১৫০+ এতিম শিশু সম্পূর্ণ বিনামূল্যে থাকা-খাওয়া ও 
              দ্বীনি শিক্ষা গ্রহণ করছে। আপনার দান-সদকা এই শিশুদের উজ্জ্বল ভবিষ্যৎ গড়তে সাহায্য করবে।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Gift className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-sm">যাকাত</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <HandHeart className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-sm">সদকা</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Heart className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-sm">ফিতরা</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-card border-2 border-primary/20">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center space-y-6">
                <div className="inline-flex p-4 bg-primary/10 rounded-full">
                  <Phone className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                </div>
                
                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">দান করতে যোগাযোগ করুন</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    আমাদের সাথে সরাসরি যোগাযোগ করে দান-সদকা প্রদান করতে পারেন
                  </p>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 sm:p-6">
                  <p className="text-sm text-muted-foreground mb-2">যোগাযোগ নম্বর</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary" dir="ltr" data-testid="text-donation-phone">
                    01883-525652
                  </p>
                </div>

                <a href="tel:01883525652" className="block">
                  <Button size="lg" className="w-full text-base sm:text-lg" data-testid="button-donation-call">
                    <Phone className="h-5 w-5 mr-2" />
                    এখনই কল করুন
                  </Button>
                </a>

                <p className="text-xs sm:text-sm text-muted-foreground">
                  সকাল ৯টা থেকে রাত ৯টা পর্যন্ত যোগাযোগ করতে পারেন
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
