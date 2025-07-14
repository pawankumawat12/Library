"use client";
import { useState } from "react";
import { Book, Users, BookOpen, BarChart } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

import { BookTable } from "./components/book-table";
import { mockBooks } from "@/data/books";
import { mockStudents } from "@/data/students";
import { Book as BookType, Student } from "@/lib/types";


const TOTAL_SEATS = 50;

export default function DashboardPage() {
  const [books, setBooks] = useState<BookType[]>(mockBooks);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  
  const availableSeats = TOTAL_SEATS - students.length;
  const totalBooks = books.reduce((sum, book) => sum + book.stock, 0);
  const issuedBooks = books.reduce((sum, book) => sum + book.issued, 0);
  const availableBooks = totalBooks - issuedBooks;

  const chartData = books.slice(0, 5).map(book => ({
    name: book.title,
    total: book.stock,
    issued: book.issued,
  }));

  const handleBookAdded = (newBook: BookType) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleBookDeleted = (bookId: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          An overview of your library's status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Seats</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{TOTAL_SEATS}</div>
            <p className="text-xs text-muted-foreground">
              {availableSeats} seats available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Registered Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
             <p className="text-xs text-muted-foreground">
              out of {TOTAL_SEATS} seats filled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
            <p className="text-xs text-muted-foreground">
              {availableBooks} books available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issued Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{issuedBooks}</div>
             <p className="text-xs text-muted-foreground">
              currently borrowed by students
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Book Stock vs. Issued
            </CardTitle>
          </CardHeader>
          <CardContent>
             <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <RechartsBarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false}/>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total" fill="hsl(var(--primary) / 0.5)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="issued" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className="space-y-6">
           <BookTable books={books} onBookAdded={handleBookAdded} onBookDeleted={handleBookDeleted} />
        </div>
      </div>
    </div>
  );
}
