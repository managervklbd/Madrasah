import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Calendar, Bell } from "lucide-react";
import { insertNoticeSchema, type Notice, type InsertNotice } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function NoticesManage() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [deleteNotice, setDeleteNotice] = useState<Notice | null>(null);

  const { data: notices, isLoading } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  const form = useForm<InsertNotice>({
    resolver: zodResolver(insertNoticeSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertNotice) => {
      return await apiRequest("POST", "/api/notices", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({
        title: "সফল!",
        description: "নোটিশ সফলভাবে যোগ করা হয়েছে।",
      });
      setIsDialogOpen(false);
      form.reset({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "নোটিশ যোগ করতে সমস্যা হয়েছে।",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: InsertNotice }) => {
      return await apiRequest("PUT", `/api/notices/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({
        title: "সফল!",
        description: "নোটিশ সফলভাবে আপডেট হয়েছে।",
      });
      setIsDialogOpen(false);
      setEditingNotice(null);
      form.reset({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "নোটিশ আপডেট করতে সমস্যা হয়েছে।",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/notices/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({
        title: "সফল!",
        description: "নোটিশ সফলভাবে মুছে ফেলা হয়েছে।",
      });
      setDeleteNotice(null);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "নোটিশ মুছতে সমস্যা হয়েছে।",
      });
    },
  });

  const handleOpenDialog = (notice?: Notice) => {
    if (notice) {
      setEditingNotice(notice);
      form.reset({
        title: notice.title,
        description: notice.description,
        date: notice.date,
      });
    } else {
      setEditingNotice(null);
      form.reset({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
    setIsDialogOpen(true);
  };

  const onSubmit = (data: InsertNotice) => {
    if (editingNotice) {
      updateMutation.mutate({ id: editingNotice.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

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

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
          <div>
            <CardTitle>নোটিশ সমূহ</CardTitle>
            <CardDescription>সকল নোটিশ দেখুন ও পরিচালনা করুন</CardDescription>
          </div>
          <Button onClick={() => handleOpenDialog()} data-testid="button-add-notice">
            <Plus className="h-4 w-4 mr-2" />
            নতুন নোটিশ
          </Button>
        </CardHeader>
        <CardContent>
          {sortedNotices.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">কোন নোটিশ নেই</h3>
              <p className="text-muted-foreground mb-4">
                এখনো কোন নোটিশ যোগ করা হয়নি
              </p>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                প্রথম নোটিশ যোগ করুন
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedNotices.map((notice) => (
                <Card key={notice.id} data-testid={`card-admin-notice-${notice.id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3
                          className="font-semibold mb-1"
                          data-testid={`text-admin-notice-title-${notice.id}`}
                        >
                          {notice.title}
                        </h3>
                        <p
                          className="text-sm text-muted-foreground mb-2 line-clamp-2"
                          data-testid={`text-admin-notice-desc-${notice.id}`}
                        >
                          {notice.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(notice.date)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleOpenDialog(notice)}
                          data-testid={`button-edit-notice-${notice.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteNotice(notice)}
                          data-testid={`button-delete-notice-${notice.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingNotice ? "নোটিশ সম্পাদনা" : "নতুন নোটিশ"}
            </DialogTitle>
            <DialogDescription>
              {editingNotice
                ? "নোটিশের তথ্য আপডেট করুন"
                : "নতুন নোটিশের তথ্য দিন"}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>নোটিশের শিরোনাম</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="নোটিশের শিরোনাম লিখুন"
                        data-testid="input-notice-title"
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
                    <FormLabel>নোটিশের বিস্তারিত</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="নোটিশের বিস্তারিত লিখুন"
                        className="min-h-[100px]"
                        data-testid="input-notice-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>তারিখ</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        data-testid="input-notice-date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-notice"
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      সেভ হচ্ছে...
                    </>
                  ) : (
                    "সেভ করুন"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteNotice} onOpenChange={() => setDeleteNotice(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>নিশ্চিত করুন</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি কি "{deleteNotice?.title}" নোটিশটি মুছে ফেলতে চান? এই কাজটি
              পূর্বাবস্থায় ফেরানো যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteNotice && deleteMutation.mutate(deleteNotice.id)}
              data-testid="button-confirm-delete"
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
    </>
  );
}
