import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";
import { aboutSchema, type About } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AboutManage() {
  const { toast } = useToast();

  const { data: about, isLoading } = useQuery<About>({
    queryKey: ["/api/about"],
  });

  const form = useForm<About>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      text: "",
      mission: "",
    },
  });

  useEffect(() => {
    if (about) {
      form.reset(about);
    }
  }, [about, form]);

  const mutation = useMutation({
    mutationFn: async (data: About) => {
      return await apiRequest("POST", "/api/about", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/about"] });
      toast({
        title: "সফল!",
        description: "আমাদের সম্পর্কে সেকশন সফলভাবে আপডেট হয়েছে।",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "আমাদের সম্পর্কে সেকশন আপডেট করতে সমস্যা হয়েছে।",
      });
    },
  });

  const onSubmit = (data: About) => {
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
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>আমাদের সম্পর্কে সম্পাদনা</CardTitle>
        <CardDescription>
          ওয়েবসাইটের আমাদের সম্পর্কে সেকশনের তথ্য আপডেট করুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>আমাদের সম্পর্কে বর্ণনা</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="মাদ্রাসার সম্পর্কে বিস্তারিত লিখুন"
                      className="min-h-[150px]"
                      data-testid="input-about-text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>আমাদের লক্ষ্য</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="মাদ্রাসার লক্ষ্য ও উদ্দেশ্য লিখুন"
                      className="min-h-[120px]"
                      data-testid="input-about-mission"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={mutation.isPending}
              data-testid="button-save-about"
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
