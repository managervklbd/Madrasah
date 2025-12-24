import { Route, Switch, Redirect, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLogin from "./login";
import AdminDashboard from "./dashboard";
import BrandingManage from "./branding-manage";
import HeroManage from "./hero-manage";
import AboutManage from "./about-manage";
import NoticesManage from "./notices-manage";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminPages() {
  const [location, setLocation] = useLocation();

  const { data: authStatus, isLoading } = useQuery<{ isAuthenticated: boolean }>({
    queryKey: ["/api/auth/check"],
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/check"] });
    },
  });

  const handleLogin = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/auth/check"] });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    setLocation("/admin");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="space-y-4 text-center">
          <Skeleton className="h-20 w-20 rounded-full mx-auto" />
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    );
  }

  if (!authStatus?.isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <Switch>
      <Route path="/admin/dashboard">
        <AdminDashboard onLogout={handleLogout} activeTab="dashboard" />
      </Route>
      <Route path="/admin/branding">
        <AdminDashboard onLogout={handleLogout} activeTab="branding">
          <BrandingManage />
        </AdminDashboard>
      </Route>
      <Route path="/admin/hero">
        <AdminDashboard onLogout={handleLogout} activeTab="hero">
          <HeroManage />
        </AdminDashboard>
      </Route>
      <Route path="/admin/about">
        <AdminDashboard onLogout={handleLogout} activeTab="about">
          <AboutManage />
        </AdminDashboard>
      </Route>
      <Route path="/admin/notices">
        <AdminDashboard onLogout={handleLogout} activeTab="notices">
          <NoticesManage />
        </AdminDashboard>
      </Route>
      <Route path="/admin">
        <Redirect to="/admin/dashboard" />
      </Route>
    </Switch>
  );
}
