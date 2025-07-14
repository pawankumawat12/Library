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

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Student Management</h1>
        <p className="text-muted-foreground">
          View and manage registered students.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>
            A list of all students in the library.
          </CardDescription>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{student.seatNumber}</Badge>
                    </TableCell>
                    <TableCell className="text-right">₹{student.fee}</TableCell>
                    <TableCell className="text-center">{student.feePaidMonths}</TableCell>
                    <TableCell>{student.examPreparation}</TableCell>
                    <TableCell>{student.checkInTime}</TableCell>
                    <TableCell>{student.checkOutTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
