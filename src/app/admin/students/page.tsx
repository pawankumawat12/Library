"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockStudents } from "@/data/students";
import type { Student } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, PlusCircle, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useToast } from "@/hooks/use-toast";
import { AddStudentDialog } from "./components/add-student-dialog";
import { EditStudentDialog } from "./components/edit-student-dialog";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedStudent) return;
    setStudents(students.filter((s) => s.id !== selectedStudent.id));
    toast({
      title: "Deleted",
      description: `Student "${selectedStudent.name}" has been removed.`,
    });
    setIsDeleteDialogOpen(false);
    setSelectedStudent(null);
  };
  
  const handleStudentAdded = (newStudent: Omit<Student, 'id'>) => {
     if (students.some(student => student.email === newStudent.email)) {
      toast({
        title: "Error",
        description: "A student with this email already exists.",
        variant: "destructive",
      });
      return;
    }
     const studentWithId: Student = {
      ...newStudent,
      id: new Date().toISOString(), // Use a more robust ID in a real app
    };
    setStudents(prev => [...prev, studentWithId]);
    toast({ title: "Success", description: "Student added." });
  };

  const handleStudentEdited = (editedStudent: Student) => {
    if (students.some(s => s.email === editedStudent.email && s.id !== editedStudent.id)) {
       toast({
        title: "Error",
        description: "Another student with this email already exists.",
        variant: "destructive",
      });
      return;
    }
     setStudents(prev => prev.map(s => s.id === editedStudent.id ? editedStudent : s));
     toast({ title: "Success", description: "Student details updated." });
  };


  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">
            View and manage registered students.
          </p>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Students</CardTitle>
              <CardDescription>
                A list of all students in the library.
              </CardDescription>
            </div>
             <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Seat</TableHead>
                    <TableHead className="text-right">Fee</TableHead>
                    <TableHead className="text-center">Months Paid</TableHead>
                    <TableHead>Exam Prep</TableHead>
                    <TableHead>Check-in Time</TableHead>
                    <TableHead>Check-out Time</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{student.seatNumber}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{student.fee}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.feePaidMonths}
                      </TableCell>
                      <TableCell>{student.examPreparation}</TableCell>
                      <TableCell>{student.checkInTime}</TableCell>
                      <TableCell>{student.checkOutTime}</TableCell>
                       <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleEditClick(student)}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(student)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <AddStudentDialog 
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        onStudentAdded={handleStudentAdded}
      />

      {selectedStudent && (
        <EditStudentDialog 
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          onStudentEdited={handleStudentEdited}
          studentToEdit={selectedStudent}
        />
      )}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the student "
              {selectedStudent?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedStudent(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
