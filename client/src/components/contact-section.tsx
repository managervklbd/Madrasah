import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Facebook, Clock, Mail } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            যোগাযোগ
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">ঠিকানা</h3>
                    <p className="text-muted-foreground" data-testid="text-contact-address">
                      মহজমপুর, ময়মনসিংহ সদর
                      <br />
                      ময়মনসিংহ, বাংলাদেশ
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">ফোন নম্বর</h3>
                    <a
                      href="tel:01883525652"
                      className="text-primary hover:underline text-lg"
                      data-testid="link-contact-phone"
                    >
                      ০১৮৮৩-৫২৫৬৫২
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">ইমেইল</h3>
                    <a
                      href="mailto:mohojompureatimkhana1990@gmail.com"
                      className="text-primary hover:underline"
                      data-testid="link-contact-email"
                    >
                      mohojompureatimkhana1990@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">অফিস সময়</h3>
                    <p className="text-muted-foreground">
                      সকাল ৯:০০ - সন্ধ্যা ৬:০০
                      <br />
                      (শুক্রবার বন্ধ)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a href="tel:01883525652" className="w-full sm:flex-1">
                <Button className="w-full" size="lg" data-testid="button-call">
                  <Phone className="h-5 w-5 mr-2" />
                  এখনই কল করুন
                </Button>
              </a>
              <a
                href="https://www.facebook.com/kamheatimkhanamadrasah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  data-testid="button-facebook"
                >
                  <Facebook className="h-5 w-5 mr-2" />
                  ফেসবুক পেজ
                </Button>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.0!2d90.4!3d24.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ1JzAwLjAiTiA5MMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="মাদ্রাসার অবস্থান"
                  data-testid="iframe-map"
                />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <Facebook className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">
                  আমাদের ফেসবুক পেজে যোগ দিন
                </h3>
                <p className="text-muted-foreground mb-4">
                  সর্বশেষ আপডেট ও খবর পেতে আমাদের পেজ ফলো করুন
                </p>
                <a
                  href="https://www.facebook.com/kamheatimkhanamadrasah"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button data-testid="button-facebook-follow">
                    <Facebook className="h-4 w-4 mr-2" />
                    ফলো করুন
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
