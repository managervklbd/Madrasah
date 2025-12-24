import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4">
      <div className="text-center max-w-lg">
        <div className="relative mb-8">
          <div className="text-[150px] sm:text-[200px] font-bold text-primary/10 leading-none select-none">
            ৪০৪
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          পৃষ্ঠা খুঁজে পাওয়া যায়নি
        </h1>
        
        <p className="text-muted-foreground mb-8 text-base sm:text-lg">
          আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি হয়তো সরানো হয়েছে, নাম পরিবর্তন করা হয়েছে, 
          অথবা সাময়িকভাবে অনুপলব্ধ।
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto" data-testid="button-go-home">
              <Home className="w-4 h-4 mr-2" />
              হোম পেজে যান
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
            data-testid="button-go-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            পূর্বের পেজে ফিরুন
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            মহাজামপুর হাফিজিয়া এতিমখানা মাদ্রাসা
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            ময়মনসিংহ সদর, ময়মনসিংহ
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
    </div>
  );
}
