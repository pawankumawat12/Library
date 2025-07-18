"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

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
import type { Student } from "@/lib/types";

const studentFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  seatNumber: z.string().min(1, "Seat number is required."),
  fee: z.coerce.number().int().min(0, "Fee must be a positive number."),
  feePaidMonths: z.coerce.number().int().min(1, "Must pay for at least 1 month."),
  examPreparation: z.string().min(1, "Exam preparation is required."),
  checkInTime: z.string().optional(),
  checkOutTime: z.string().optional(),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

interface AddStudentDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onStudentAdded: (newStudent: Omit<Student, 'id'>) => void;
}

export function AddStudentDialog({
  isOpen,
  setIsOpen,
  onStudentAdded,
}: AddStudentDialogProps) {

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      seatNumber: "",
      fee: 0,
      feePaidMonths: 1,
      examPreparation: "",
      checkInTime: format(new Date(), "PPpp"),
      checkOutTime: "-",
    },
  });

  function onSubmit(values: StudentFormValues) {
    onStudentAdded(values);
    setIsOpen(false);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        form.reset({
          name: "",
          email: "",
          seatNumber: "",
          fee: 0,
          feePaidMonths: 1,
          examPreparation: "",
          checkInTime: format(new Date(), "PPpp"),
          checkOutTime: "-",
        });
      }
      setIsOpen(open);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Fill in the student's details to register them.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add-student-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seatNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seat Number</FormLabel>
                  <FormControl>
                    <Input placeholder="A15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Fee (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="feePaidMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Months Fee Paid</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="examPreparation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preparing for Exam</FormLabel>
                  <FormControl>
                    <Input placeholder="Civil Services" {...field} />
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
            form="add-student-form"
          >
            Add Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
