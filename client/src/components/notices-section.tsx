import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Calendar, ChevronRight } from "lucide-react";
import type { Notice } from "@shared/schema";

export function NoticesSection() {
  const { data: notices, isLoading } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const sortedNotices = notices
    ? [...notices].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];

  return (
    <section id="notices" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            নোটিশ বোর্ড
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            সর্বশেষ নোটিশ সমূহ
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : sortedNotices.length === 0 ? (
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="py-12">
              <Bell className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">কোন নোটিশ নেই</h3>
              <p className="text-muted-foreground">
                বর্তমানে কোন নোটিশ প্রকাশিত হয়নি।
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedNotices.map((notice, index) => (
              <Card
                key={notice.id}
                className="group overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                data-testid={`card-notice-${notice.id}`}
              >
                <div className="h-1 bg-gradient-to-r from-primary to-primary/60" />
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle
                      className="text-lg leading-snug"
                      data-testid={`text-notice-title-${notice.id}`}
                    >
                      {notice.title}
                    </CardTitle>
                    {index === 0 && (
                      <Badge
                        variant="secondary"
                        className="shrink-0 bg-orange-500/10 text-orange-600 dark:text-orange-400"
                      >
                        নতুন
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-muted-foreground mb-4 line-clamp-3"
                    data-testid={`text-notice-description-${notice.id}`}
                  >
                    {notice.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span data-testid={`text-notice-date-${notice.id}`}>
                        {formatDate(notice.date)}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
