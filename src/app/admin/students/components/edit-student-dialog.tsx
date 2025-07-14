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
import type { Student } from "@/lib/types";

const studentFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  seatNumber: z.string().min(1, "Seat number is required."),
  fee: z.coerce.number().int().min(0, "Fee must be a positive number."),
  feePaidMonths: z.coerce.number().int().min(0, "Paid months must be a positive number."),
  examPreparation: z.string().min(1, "Exam preparation is required."),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

interface EditStudentDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onStudentEdited: (editedStudent: Student) => void;
  studentToEdit: Student;
}

export function EditStudentDialog({
  isOpen,
  setIsOpen,
  onStudentEdited,
  studentToEdit,
}: EditStudentDialogProps) {
  const { toast } = useToast();

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
  });
  
  useEffect(() => {
    if (studentToEdit) {
      form.reset({
        name: studentToEdit.name,
        email: studentToEdit.email,
        seatNumber: studentToEdit.seatNumber,
        fee: studentToEdit.fee,
        feePaidMonths: studentToEdit.feePaidMonths,
        examPreparation: studentToEdit.examPreparation,
      });
    }
  }, [studentToEdit, form, isOpen]);


  function onSubmit(values: StudentFormValues) {
    const editedStudent: Student = {
      ...studentToEdit,
      ...values,
    };
    onStudentEdited(editedStudent);
    toast({ title: "Success", description: "Student details updated." });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Update the student's details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="edit-student-form"
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
          <Button type="submit" form="edit-student-form">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
