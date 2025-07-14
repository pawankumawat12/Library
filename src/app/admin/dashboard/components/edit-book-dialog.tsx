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
import type { Book } from "@/lib/types";

const bookFormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  author: z.string().min(1, "Author is required."),
  stock: z.coerce.number().int().min(0, "Stock must be a positive number."),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

interface EditBookDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onBookEdited: (editedBook: Book) => void;
  bookToEdit: Book;
}

export function EditBookDialog({
  isOpen,
  setIsOpen,
  onBookEdited,
  bookToEdit,
}: EditBookDialogProps) {
  const { toast } = useToast();

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: bookToEdit.title,
      author: bookToEdit.author,
      stock: bookToEdit.stock,
    },
  });
  
  useEffect(() => {
    if (bookToEdit) {
      form.reset({
        title: bookToEdit.title,
        author: bookToEdit.author,
        stock: bookToEdit.stock,
      });
    }
  }, [bookToEdit, form, isOpen]);


  function onSubmit(values: BookFormValues) {
    const editedBook: Book = {
      ...bookToEdit,
      ...values,
    };
    onBookEdited(editedBook);
    toast({ title: "Success", description: "Book details updated." });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Update the details of the book. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="edit-book-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="The Great Gatsby" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="F. Scott Fitzgerald" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
          <Button type="submit" form="edit-book-form">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
