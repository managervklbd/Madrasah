import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";
import { heroSchema, type Hero } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function HeroManage() {
  const { toast } = useToast();

  const { data: hero, isLoading } = useQuery<Hero>({
    queryKey: ["/api/hero"],
  });

  const form = useForm<Hero>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      name: "",
      slogan: "",
      description: "",
      buttonText: "",
    },
  });

  useEffect(() => {
    if (hero) {
      form.reset(hero);
    }
  }, [hero, form]);

  const mutation = useMutation({
    mutationFn: async (data: Hero) => {
      return await apiRequest("POST", "/api/hero", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hero"] });
      toast({
        title: "সফল!",
        description: "হিরো সেকশন সফলভাবে আপডেট হয়েছে।",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "হিরো সেকশন আপডেট করতে সমস্যা হয়েছে।",
      });
    },
  });

  const onSubmit = (data: Hero) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>হিরো সেকশন সম্পাদনা</CardTitle>
        <CardDescription>
          ওয়েবসাইটের প্রধান হিরো সেকশনের তথ্য আপডেট করুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>মাদ্রাসার নাম</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="মাদ্রাসার নাম লিখুন"
                      data-testid="input-hero-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slogan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>স্লোগান</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="মাদ্রাসার স্লোগান লিখুন"
                      data-testid="input-hero-slogan"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>সংক্ষিপ্ত বর্ণনা</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="মাদ্রাসার সংক্ষিপ্ত বর্ণনা লিখুন"
                      className="min-h-[100px]"
                      data-testid="input-hero-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>বাটন টেক্সট</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="বাটনে যে লেখা দেখাবে"
                      data-testid="input-hero-button"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={mutation.isPending}
              data-testid="button-save-hero"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  সেভ হচ্ছে...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  সেভ করুন
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
