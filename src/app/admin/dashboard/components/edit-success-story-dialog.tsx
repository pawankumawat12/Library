"use client";

import { useEffect } from "react";
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

interface EditSuccessStoryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onStoryEdited: (editedStory: SuccessStory) => void;
  storyToEdit: SuccessStory;
}

export function EditSuccessStoryDialog({
  isOpen,
  setIsOpen,
  onStoryEdited,
  storyToEdit,
}: EditSuccessStoryDialogProps) {
  const { toast } = useToast();

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      studentName: storyToEdit.studentName,
      achievement: storyToEdit.achievement,
      imageUrl: storyToEdit.imageUrl,
    },
  });
  
  useEffect(() => {
    if (storyToEdit) {
      form.reset({
        studentName: storyToEdit.studentName,
        achievement: storyToEdit.achievement,
        imageUrl: storyToEdit.imageUrl,
      });
    }
  }, [storyToEdit, form, isOpen]);


  function onSubmit(values: StoryFormValues) {
    const editedStory: SuccessStory = {
      ...storyToEdit,
      ...values,
    };
    onStoryEdited(editedStory);
    toast({ title: "Success", description: "Success story updated." });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Success Story</DialogTitle>
          <DialogDescription>
            Update the details of the student's achievement.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="edit-story-form"
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
          <Button type="submit" form="edit-story-form">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
