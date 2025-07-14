"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { flagSimilarBookEntries } from "@/ai/flows/flag-similar-book-entries";

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

interface AddBookDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onBookAdded: (newBook: Book) => void;
  existingBooks: Book[];
}

export function AddBookDialog({
  isOpen,
  setIsOpen,
  onBookAdded,
  existingBooks,
}: AddBookDialogProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [similarBooks, setSimilarBooks] = useState<
    { title: string; author: string }[]
  >([]);
  const { toast } = useToast();

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      stock: 0,
    },
  });

  const getPotentialSubmission = (): BookFormValues | null => {
    const values = form.getValues();
    const result = bookFormSchema.safeParse(values);
    return result.success ? result.data : null;
  };

  const handleFinalSubmit = (values: BookFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newBook: Book = {
        id: new Date().toISOString(), // Use a more robust ID in a real app
        ...values,
        issued: 0,
      };
      onBookAdded(newBook);
      toast({ title: "Success", description: "Book added to the library." });
      setIsSubmitting(false);
      setIsOpen(false);
      form.reset();
    }, 500);
  };

  async function onSubmit(values: BookFormValues) {
    setIsChecking(true);
    try {
      const result = await flagSimilarBookEntries({
        title: values.title,
        author: values.author,
        existingTitles: existingBooks.map(({ title, author }) => ({
          title,
          author,
        })),
      });

      if (result.isSimilar) {
        setSimilarBooks(result.similarTitles);
      } else {
        handleFinalSubmit(values);
      }
    } catch (error) {
      console.error("AI check failed:", error);
      toast({
        title: "AI Check Failed",
        description:
          "Could not verify book similarity. Please check your connection or try again.",
        variant: "destructive",
      });
      // Optionally allow submission even if AI fails
      // handleFinalSubmit(values);
    } finally {
      setIsChecking(false);
    }
  }

  const handleProceedWithSimilar = () => {
    const values = getPotentialSubmission();
    if (values) {
      handleFinalSubmit(values);
    }
    setSimilarBooks([]);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
        setIsOpen(open);
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>
              Fill in the details of the new book to add it to the library.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="add-book-form"
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
            <Button
              type="submit"
              form="add-book-form"
              disabled={isChecking || isSubmitting}
            >
              {isChecking
                ? "Checking for duplicates..."
                : isSubmitting
                ? "Adding book..."
                : "Add Book"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={similarBooks.length > 0}
        onOpenChange={() => setSimilarBooks([])}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Potential Duplicate Found</AlertDialogTitle>
            <AlertDialogDescription>
              This book seems similar to the following existing entries:
              <ul className="list-disc pl-5 mt-2 text-sm text-foreground">
                {similarBooks.map((book) => (
                  <li key={`${book.title}-${book.author}`}>
                    {book.title} by {book.author}
                  </li>
                ))}
              </ul>
              Do you still want to add this book?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleProceedWithSimilar}>
              Add Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
