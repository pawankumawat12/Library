import type { Student } from "@/lib/types";
import { format } from "date-fns";

export const mockStudents: Student[] = [
  {
    id: "s1",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    seatNumber: "A12",
    checkInTime: format(new Date(), "PPpp"),
  },
  {
    id: "s2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    seatNumber: "B05",
    checkInTime: format(new Date(), "PPpp"),
  },
  {
    id: "s3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    seatNumber: "C21",
    checkInTime: format(new Date(), "PPpp"),
  },
  {
    id: "s4",
    name: "Diana Prince",
    email: "diana.p@example.com",
    seatNumber: "D11",
    checkInTime: format(new Date(), "PPpp"),
  },
];
