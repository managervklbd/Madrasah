import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Loader2, Image, Video, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { insertHeroSlideSchema, type HeroSlide, type InsertHeroSlide } from "@shared/schema";
import { useState, useRef } from "react";
import { useUpload } from "@/hooks/use-upload";

export default function HeroSlidesManage() {
  const { toast } = useToast();
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [deletingSlide, setDeletingSlide] = useState<HeroSlide | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadFile, isUploading, progress } = useUpload({
    onSuccess: (response) => {
      form.setValue("mediaUrl", response.objectPath);
      toast({ title: "সফল!", description: "ফাইল আপলোড হয়েছে" });
    },
    onError: () => {
      toast({ title: "ত্রুটি!", description: "ফাইল আপলোড করা যায়নি", variant: "destructive" });
    },
  });

  const { data: slides, isLoading } = useQuery<HeroSlide[]>({
    queryKey: ["/api/hero-slides"],
  });

  const form = useForm<InsertHeroSlide>({
    resolver: zodResolver(insertHeroSlideSchema),
    defaultValues: {
      title: "",
      mediaUrl: "",
      mediaType: "image",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertHeroSlide) => apiRequest("POST", "/api/hero-slides", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hero-slides"] });
      toast({ title: "সফল!", description: "নতুন স্লাইড যোগ করা হয়েছে" });
      form.reset();
      setIsAddDialogOpen(false);
    },
    onError: () => {
      toast({ title: "ত্রুটি!", description: "স্লাইড যোগ করা যায়নি", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: number; slide: InsertHeroSlide }) =>
      apiRequest("PUT", `/api/hero-slides/${data.id}`, data.slide),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hero-slides"] });
      toast({ title: "সফল!", description: "স্লাইড আপডেট করা হয়েছে" });
      setEditingSlide(null);
      form.reset();
    },
    onError: () => {
      toast({ title: "ত্রুটি!", description: "স্লাইড আপডেট করা যায়নি", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/hero-slides/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hero-slides"] });
      toast({ title: "সফল!", description: "স্লাইড মুছে ফেলা হয়েছে" });
      setDeletingSlide(null);
    },
    onError: () => {
      toast({ title: "ত্রুটি!", description: "স্লাইড মুছে ফেলা যায়নি", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertHeroSlide) => {
    if (editingSlide) {
      updateMutation.mutate({ id: editingSlide.id, slide: data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    form.reset({
      title: slide.title,
      mediaUrl: slide.mediaUrl,
      mediaType: slide.mediaType || "image",
    });
  };

  const handleAddNew = () => {
    setEditingSlide(null);
    form.reset({
      title: "",
      mediaUrl: "",
      mediaType: "image",
    });
    setIsAddDialogOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");
    form.setValue("mediaType", isVideo ? "video" : "image", { shouldValidate: true });
    
    await uploadFile(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const currentMediaType = form.watch("mediaType");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="aspect-video rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const SlideForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>শিরোনাম</FormLabel>
              <FormControl>
                <Input {...field} placeholder="স্লাইডের শিরোনাম লিখুন" data-testid="input-slide-title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label>ফাইল আপলোড করুন</Label>
          <div className="flex gap-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              disabled={isUploading}
              data-testid="input-slide-file"
              className="flex-1"
            />
            {isUploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                {progress}%
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">ছবি বা ভিডিও ফাইল আপলোড করুন</p>
        </div>

        <FormField
          control={form.control}
          name="mediaUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>মিডিয়া URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com/file.jpg" data-testid="input-slide-url" />
              </FormControl>
              <FormDescription>অথবা সরাসরি URL দিন</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mediaType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>মিডিয়ার ধরন</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-slide-type">
                    <SelectValue placeholder="ধরন নির্বাচন করুন" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="image">ছবি</SelectItem>
                  <SelectItem value="video">ভিডিও</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          className="w-full"
          disabled={createMutation.isPending || updateMutation.isPending || isUploading}
          data-testid="button-save-slide"
        >
          {(createMutation.isPending || updateMutation.isPending) ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              সংরক্ষণ হচ্ছে...
            </>
          ) : editingSlide ? (
            "আপডেট করুন"
          ) : (
            "যোগ করুন"
          )}
        </Button>
      </form>
    </Form>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">হিরো স্লাইডার ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground">হোমপেজে ক্যারোসেল স্লাইড যোগ, সম্পাদনা ও মুছুন</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} data-testid="button-add-slide">
              <Plus className="h-4 w-4 mr-2" />
              নতুন স্লাইড যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>নতুন স্লাইড যোগ করুন</DialogTitle>
              <DialogDescription>হিরো সেকশনে নতুন ছবি বা ভিডিও যোগ করুন</DialogDescription>
            </DialogHeader>
            <SlideForm />
          </DialogContent>
        </Dialog>
      </div>

      {!slides || slides.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Image className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">কোন স্লাইড নেই</h3>
            <p className="text-muted-foreground mb-4">হিরো সেকশনে এখনো কোন স্লাইড যোগ করা হয়নি</p>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              প্রথম স্লাইড যোগ করুন
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slides.map((slide, index) => (
            <Card key={slide.id} className="overflow-hidden group" data-testid={`card-admin-slide-${slide.id}`}>
              <div className="aspect-video relative overflow-hidden bg-muted">
                {slide.mediaType === "video" ? (
                  <video
                    src={slide.mediaUrl}
                    className="w-full h-full object-cover"
                    muted
                  />
                ) : (
                  <img
                    src={slide.mediaUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/800x450/0d9488/ffffff?text=স্লাইড";
                    }}
                  />
                )}
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <GripVertical className="h-3 w-3" />
                  {index + 1}
                </div>
                {slide.mediaType === "video" && (
                  <div className="absolute top-2 right-2">
                    <Video className="h-5 w-5 text-white drop-shadow-lg" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="secondary" onClick={() => handleEdit(slide)} data-testid={`button-edit-slide-${slide.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>স্লাইড সম্পাদনা করুন</DialogTitle>
                        <DialogDescription>স্লাইডের তথ্য আপডেট করুন</DialogDescription>
                      </DialogHeader>
                      <SlideForm />
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => setDeletingSlide(slide)}
                    data-testid={`button-delete-slide-${slide.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="font-medium text-sm line-clamp-1">{slide.title}</p>
                <p className="text-xs text-muted-foreground">
                  {slide.mediaType === "video" ? "ভিডিও" : "ছবি"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deletingSlide} onOpenChange={() => setDeletingSlide(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>স্লাইড মুছে ফেলতে চান?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deletingSlide?.title}" মুছে ফেলা হবে। এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingSlide && deleteMutation.mutate(deletingSlide.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "মুছে ফেলুন"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
