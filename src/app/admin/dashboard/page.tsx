"use client";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Book, Users, BookOpen, MessageSquareWarning, BarChart } from "lucide-react";

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
import { ComplaintsTable } from "./components/complaints-table";
import { SuccessStoriesTable } from "./components/success-stories-table";

import { mockStudents } from "@/data/students";
import { mockSuccessStories } from "@/data/success-stories";

import { Book as BookType, Student, Complaint, SuccessStory } from "@/lib/types";


const TOTAL_SEATS = 50;

const mockComplaints: Complaint[] = [
  {
    id: 'c1',
    studentName: 'Alice Johnson',
    studentEmail: 'alice.j@example.com',
    subject: 'Broken chair in study area',
    message: 'The chair at desk A12 has a wobbly leg. It feels unsafe to sit on.',
    status: 'Pending',
    date: '2024-08-15',
  },
  {
    id: 'c2',
    studentName: 'Bob Smith',
    studentEmail: 'bob.smith@example.com',
    subject: 'Request for new book',
    message: 'Could we please get a copy of "Atomic Habits" by James Clear?',
    status: 'Resolved',
    date: '2024-08-14',
    response: 'Thanks for the suggestion! The book has been ordered and will be available next week.',
  }
];


export default function DashboardPage() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>(mockSuccessStories);
  
  // Real-time listener for books from Firestore
  useEffect(() => {
    const q = query(collection(db, "books"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const booksData: BookType[] = [];
      querySnapshot.forEach((doc) => {
        booksData.push({ ...doc.data(), id: doc.id } as BookType);
      });
      setBooks(booksData);
    });
    return () => unsubscribe();
  }, []);

  const availableSeats = TOTAL_SEATS - students.length;
  const totalBooks = books.reduce((sum, book) => sum + book.stock, 0);
  const issuedBooks = books.reduce((sum, book) => sum + book.issued, 0);
  const availableBooks = totalBooks - issuedBooks;
  const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;

  const chartData = books.slice(0, 5).map(book => ({
    name: book.title,
    total: book.stock,
    issued: book.issued,
  }));

  const handleBookAdded = async (newBookData: Omit<BookType, 'id' | 'issued'>) => {
    try {
      await addDoc(collection(db, 'books'), {
        ...newBookData,
        issued: 0, // Ensure issued is set to 0 for new books
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  const handleBookEdited = async (editedBook: BookType) => {
    try {
      const bookRef = doc(db, 'books', editedBook.id);
      await updateDoc(bookRef, {
        title: editedBook.title,
        author: editedBook.author,
        stock: editedBook.stock,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  };

  const handleBookDeleted = async (bookId: string) => {
    try {
      await deleteDoc(doc(db, 'books', bookId));
    } catch (error) {
      console.error("Error deleting document: ", error);
      throw error;
    }
  };
  
  const handleSuccessStoryAdded = (newStory: SuccessStory) => {
    setSuccessStories((prev) => [...prev, newStory]);
  };

  const handleSuccessStoryEdited = (editedStory: SuccessStory) => {
    setSuccessStories((prev) =>
      prev.map((story) => (story.id === editedStory.id ? editedStory : story))
    );
  };

  const handleSuccessStoryDeleted = (storyId: string) => {
    setSuccessStories((prev) => prev.filter((story) => story.id !== storyId));
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
              currently borrowed
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
            <CardTitle className="text-sm font-medium">Pending Complaints</CardTitle>
            <MessageSquareWarning className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingComplaints}</div>
            <p className="text-xs text-muted-foreground">
              {complaints.length} total complaints
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <BookTable
          books={books}
          onBookAdded={handleBookAdded}
          onBookEdited={handleBookEdited}
          onBookDeleted={handleBookDeleted}
        />
        <ComplaintsTable complaints={complaints} setComplaints={setComplaints} />
      </div>
       
       <div className="grid gap-6">
        <SuccessStoriesTable
          stories={successStories}
          onStoryAdded={handleSuccessStoryAdded}
          onStoryEdited={handleSuccessStoryEdited}
          onStoryDeleted={handleSuccessStoryDeleted}
        />
      </div>

       <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Top 5 Books: Stock vs. Issued
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
                    <Bar dataKey="total" fill="hsl(var(--primary) / 0.5)" radius={[4, 4, 0, 0]} name="Total Stock" />
                    <Bar dataKey="issued" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Issued" />
                  </RechartsBarChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
    </div>
  );
}
