"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { SuccessStory } from "@/lib/types";

const storyFormSchema = z.object({
  studentName: z.string().min(1, "Student name is required."),
  achievement: z.string().min(1, "Achievement is required."),
  imageUrl: z.string().url("Please enter a valid image URL."),
});

type StoryFormValues = z.infer<typeof storyFormSchema>;

interface AddSuccessStoryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onStoryAdded: (newStory: SuccessStory) => void;
}

export function AddSuccessStoryDialog({
  isOpen,
  setIsOpen,
  onStoryAdded,
}: AddSuccessStoryDialogProps) {
  const { toast } = useToast();

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      studentName: "",
      achievement: "",
      imageUrl: "",
    },
  });

  function onSubmit(values: StoryFormValues) {
    const newStory: SuccessStory = {
      id: new Date().toISOString(), // Use a more robust ID in a real app
      ...values,
    };
    onStoryAdded(newStory);
    toast({ title: "Success", description: "Success story added." });
    setIsOpen(false);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        form.reset();
      }
      setIsOpen(open);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Success Story</DialogTitle>
          <DialogDescription>
            Showcase a student's achievement on the Wall of Fame.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add-story-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="achievement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achievement</FormLabel>
                  <FormControl>
                    <Input placeholder="Cleared Civil Services Exam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Photo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/400x400.png" {...field} />
                  </FormControl>
                   <p className="text-xs text-muted-foreground pt-1">
                      For now, please use a placeholder URL like `https://placehold.co/400x400.png`.
                    </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-story-form"
          >
            Add Story
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
