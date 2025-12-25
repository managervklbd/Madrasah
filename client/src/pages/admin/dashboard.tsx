import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  LayoutDashboard,
  FileText,
  Bell,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Home,
  Palette,
  Images,
  SlidersHorizontal,
  Lock,
} from "lucide-react";
import logoImage from "@assets/image_1766561812238.png";
import type { Notice } from "@shared/schema";

interface AdminDashboardProps {
  onLogout: () => void;
  children?: React.ReactNode;
  activeTab?: string;
}

export default function AdminDashboard({
  onLogout,
  children,
  activeTab = "dashboard",
}: AdminDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const { data: notices } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  const menuItems = [
    {
      id: "dashboard",
      label: "ড্যাশবোর্ড",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      id: "branding",
      label: "ব্র্যান্ডিং",
      icon: Palette,
      href: "/admin/branding",
    },
    {
      id: "hero",
      label: "হিরো সেকশন",
      icon: SlidersHorizontal,
      href: "/admin/hero",
    },
    {
      id: "about",
      label: "আমাদের সম্পর্কে",
      icon: FileText,
      href: "/admin/about",
    },
    { id: "notices", label: "নোটিশ সমূহ", icon: Bell, href: "/admin/notices" },
    {
      id: "gallery",
      label: "ফটো গ্যালারি",
      icon: Images,
      href: "/admin/gallery",
    },
    {
      id: "password",
      label: "পাসওয়ার্ড পরিবর্তন",
      icon: Lock,
      href: "/admin/password",
    },
  ];

  const handleLogout = () => {
    onLogout();
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-lg shadow-md border border-border"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        data-testid="button-sidebar-toggle"
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="লোগো" className="h-10 w-auto" />
              <div>
                <h2 className="font-semibold text-sm">অ্যাডমিন প্যানেল</h2>
                <p className="text-xs text-muted-foreground">
                  মাদ্রাসা ম্যানেজমেন্ট
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <Button
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    activeTab === item.id ? "bg-sidebar-accent" : ""
                  }`}
                  data-testid={`link-admin-${item.id}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border space-y-2">
            <Link href="/">
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                data-testid="link-view-site"
              >
                <ExternalLink className="h-4 w-4" />
                ওয়েবসাইট দেখুন
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4" />
              লগআউট
            </Button>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="lg:ml-64">
        <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between gap-4 p-4 pl-16 lg:pl-4">
            <h1 className="text-xl font-semibold">
              {menuItems.find((item) => item.id === activeTab)?.label ||
                "ড্যাশবোর্ড"}
            </h1>
            <ThemeToggle />
          </div>
        </header>

        <main className="p-4 lg:p-6">
          {children || (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      মোট নোটিশ
                    </CardTitle>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div
                      className="text-3xl font-bold"
                      data-testid="text-total-notices"
                    >
                      {notices?.length || 0}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      সর্বশেষ আপডেট
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-semibold">আজকে</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      স্ট্যাটাস
                    </CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-semibold text-green-600">
                      সক্রিয়
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      প্রতিষ্ঠিত
                    </CardTitle>
                    <Images className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-semibold">১৯৯০ ইং</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>স্বাগতম!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    মহজমপুর হাফিজিয়া এতিমখানা মাদ্রাসার অ্যাডমিন প্যানেলে
                    স্বাগতম। এখান থেকে আপনি ওয়েবসাইটের বিভিন্ন সেকশন পরিচালনা
                    করতে পারবেন।
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/admin/hero">
                      <Button variant="outline" size="sm">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        হিরো সম্পাদনা
                      </Button>
                    </Link>
                    <Link href="/admin/about">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        আবাউট সম্পাদনা
                      </Button>
                    </Link>
                    <Link href="/admin/notices">
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        নোটিশ ম্যানেজ
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
