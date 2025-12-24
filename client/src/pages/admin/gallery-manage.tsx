import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
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
import { Plus, Pencil, Trash2, Loader2, ImageIcon, Video, Star, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { insertGalleryImageSchema, type GalleryImage, type InsertGalleryImage } from "@shared/schema";
import { useState, useRef } from "react";
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload";

export default function GalleryManage() {
  const { toast } = useToast();
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deletingImage, setDeletingImage] = useState<GalleryImage | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadFile, isUploading, progress } = useCloudinaryUpload({
    onSuccess: (response) => {
      form.setValue("imageUrl", response.url);
      toast({ title: "সফল!", description: "ফাইল আপলোড হয়েছে" });
    },
    onError: () => {
      toast({ title: "ত্রুটি!", description: "ফাইল আপলোড করা যায়নি", variant: "destructive" });
    },
  });

  const { data: images, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const form = useForm<InsertGalleryImage>({
    resolver: zodResolver(insertGalleryImageSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      caption: "",
      mediaType: "image",
      isFeatured: "false",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertGalleryImage) => apiRequest("POST", "/api/gallery", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "সফল!", description: "নতুন মিডিয়া যোগ করা হয়েছে" });
      form.reset();
      setIsAddDialogOpen(false);
    },
    onError: () => {
      toast({ title: "ত্রুটি!", description: "মিডিয়া যোগ করা যায়নি", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: number; image: InsertGalleryImage }) =>
      apiRequest("PUT", `/api/gallery/${data.id}`, data.image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "সফল!", description: "মিডিয়া আপডেট করা হয়েছে" });
      setEditingImage(null);
      form.reset();
    },
    onError: () => {
      toast({ title: "ত্রুটি!", description: "মিডিয়া আপডেট করা যায়নি", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/gallery/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "সফল!", description: "মিডিয়া মুছে ফেলা হয়েছে" });
      setDeletingImage(null);
    },
    onError: () => {
      toast({ title: "ত্রুটি!", description: "মিডিয়া মুছে ফেলা যায়নি", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertGalleryImage) => {
    if (editingImage) {
      updateMutation.mutate({ id: editingImage.id, image: data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    form.reset({
      title: image.title,
      imageUrl: image.imageUrl,
      caption: image.caption || "",
      mediaType: image.mediaType || "image",
      isFeatured: image.isFeatured || "false",
    });
  };

  const handleAddNew = () => {
    setEditingImage(null);
    form.reset({
      title: "",
      imageUrl: "",
      caption: "",
      mediaType: "image",
      isFeatured: "false",
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const ImageForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>শিরোনাম</FormLabel>
              <FormControl>
                <Input {...field} placeholder="শিরোনাম লিখুন" data-testid="input-gallery-title" />
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
              data-testid="input-gallery-file"
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
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>মিডিয়া URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com/file.jpg" data-testid="input-gallery-url" />
              </FormControl>
              <FormDescription>অথবা সরাসরি URL দিন</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="mediaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>মিডিয়ার ধরন</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-gallery-type">
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

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ফিচার্ড</FormLabel>
                <div className="flex items-center gap-2 pt-2">
                  <Switch
                    checked={field.value === "true"}
                    onCheckedChange={(checked) => field.onChange(checked ? "true" : "false")}
                    data-testid="switch-gallery-featured"
                  />
                  <Label className="text-sm text-muted-foreground">
                    {field.value === "true" ? "হ্যাঁ" : "না"}
                  </Label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ক্যাপশন (ঐচ্ছিক)</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} placeholder="বিবরণ" data-testid="input-gallery-caption" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          className="w-full"
          disabled={createMutation.isPending || updateMutation.isPending || isUploading}
          data-testid="button-save-gallery"
        >
          {(createMutation.isPending || updateMutation.isPending) ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              সংরক্ষণ হচ্ছে...
            </>
          ) : editingImage ? (
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
          <h1 className="text-2xl font-bold">গ্যালারি ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground">মাদরাসার ছবি ও ভিডিও যোগ, সম্পাদনা ও মুছুন</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} data-testid="button-add-gallery">
              <Plus className="h-4 w-4 mr-2" />
              নতুন মিডিয়া যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>নতুন মিডিয়া যোগ করুন</DialogTitle>
              <DialogDescription>গ্যালারিতে নতুন ছবি বা ভিডিও যোগ করুন</DialogDescription>
            </DialogHeader>
            <ImageForm />
          </DialogContent>
        </Dialog>
      </div>

      {!images || images.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <ImageIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">কোন মিডিয়া নেই</h3>
            <p className="text-muted-foreground mb-4">গ্যালারিতে এখনো কোন ছবি বা ভিডিও যোগ করা হয়নি</p>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              প্রথম মিডিয়া যোগ করুন
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden group" data-testid={`card-admin-gallery-${image.id}`}>
              <div className="aspect-square relative overflow-hidden bg-muted">
                {image.mediaType === "video" ? (
                  <video
                    src={image.imageUrl}
                    className="w-full h-full object-cover"
                    muted
                  />
                ) : (
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/400x400/0d9488/ffffff?text=ছবি";
                    }}
                  />
                )}
                {image.mediaType === "video" && (
                  <div className="absolute top-2 left-2">
                    <Video className="h-5 w-5 text-white drop-shadow-lg" />
                  </div>
                )}
                {image.isFeatured === "true" && (
                  <div className="absolute top-2 right-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="secondary" onClick={() => handleEdit(image)} data-testid={`button-edit-gallery-${image.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>মিডিয়া সম্পাদনা করুন</DialogTitle>
                        <DialogDescription>মিডিয়ার তথ্য আপডেট করুন</DialogDescription>
                      </DialogHeader>
                      <ImageForm />
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => setDeletingImage(image)}
                    data-testid={`button-delete-gallery-${image.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="font-medium text-sm line-clamp-1">{image.title}</p>
                {image.caption && (
                  <p className="text-xs text-muted-foreground line-clamp-1">{image.caption}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deletingImage} onOpenChange={() => setDeletingImage(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>মিডিয়া মুছে ফেলতে চান?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deletingImage?.title}" মুছে ফেলা হবে। এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingImage && deleteMutation.mutate(deletingImage.id)}
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
