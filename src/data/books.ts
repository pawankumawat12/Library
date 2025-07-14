import type { Book } from "@/lib/types";

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    stock: 5,
    issued: 2,
  },
  {
    id: "2",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    stock: 3,
    issued: 3,
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    stock: 8,
    issued: 1,
  },
  { id: "4", title: "1984", author: "George Orwell", stock: 6, issued: 4 },
  {
    id: "5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    stock: 4,
    issued: 0,
  },
  {
    id: "6",
    title: "One Hundred Years of Solitude",
    author: "Gabriel Garcia Marquez",
    stock: 2,
    issued: 2,
  },
  { id: "7", title: "Moby Dick", author: "Herman Melville", stock: 3, issued: 1 },
  { id: "8", title: "War and Peace", author: "Leo Tolstoy", stock: 1, issued: 1 },
];
