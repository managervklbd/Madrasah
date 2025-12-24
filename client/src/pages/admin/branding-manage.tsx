import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { brandingSchema, type Branding } from "@shared/schema";
import { Save, Loader2, Image, Type, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import defaultLogo from "@assets/image_1766561812238.png";

export default function BrandingManage() {
  const { toast } = useToast();

  const { data: branding, isLoading } = useQuery<Branding>({
    queryKey: ["/api/branding"],
  });

  const form = useForm<Branding>({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      siteName: "",
      logoUrl: "",
    },
  });

  useEffect(() => {
    if (branding) {
      form.reset(branding);
    }
  }, [branding, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: Branding) => {
      return await apiRequest("POST", "/api/branding", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/branding"] });
      toast({
        title: "সফল!",
        description: "ব্র্যান্ডিং সেটিংস আপডেট হয়েছে।",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "সেটিংস আপডেট করতে সমস্যা হয়েছে।",
      });
    },
  });

  const onSubmit = (data: Branding) => {
    updateMutation.mutate(data);
  };

  const handleResetLogo = () => {
    form.setValue("logoUrl", "");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentLogoUrl = form.watch("logoUrl");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ব্র্যান্ডিং সেটিংস</h1>
        <p className="text-muted-foreground">ওয়েবসাইটের নাম ও লোগো পরিবর্তন করুন</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              সাইট সেটিংস
            </CardTitle>
            <CardDescription>ওয়েবসাইটের নাম ও লোগো URL সেট করুন</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="siteName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>সাইটের নাম</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="মাদ্রাসার নাম লিখুন"
                          data-testid="input-site-name"
                        />
                      </FormControl>
                      <FormDescription>
                        এই নামটি নেভিগেশন বার ও ব্রাউজার ট্যাবে দেখা যাবে
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>লোগো URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://example.com/logo.png"
                          data-testid="input-logo-url"
                        />
                      </FormControl>
                      <FormDescription>
                        লোগো ছবির URL দিন। খালি রাখলে ডিফল্ট লোগো ব্যবহার হবে।
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    data-testid="button-save-branding"
                  >
                    {updateMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        সংরক্ষণ হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        সংরক্ষণ করুন
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetLogo}
                    data-testid="button-reset-logo"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    ডিফল্ট লোগো
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              লোগো প্রিভিউ
            </CardTitle>
            <CardDescription>বর্তমান লোগো দেখুন</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div className="bg-muted/50 rounded-lg p-6 inline-block">
                <img
                  src={currentLogoUrl || defaultLogo}
                  alt="Logo Preview"
                  className="h-24 w-auto mx-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultLogo;
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {currentLogoUrl ? "কাস্টম লোগো" : "ডিফল্ট লোগো"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
