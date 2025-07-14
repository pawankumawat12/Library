export interface Book {
  id: string;
  title: string;
  author: string;
  stock: number;
  issued: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  seatNumber: string;
  checkInTime: string;
  fee: number;
  feePaidMonths: number;
  examPreparation: string;
}

export interface Complaint {
  id: string;
  studentName: string;
  studentEmail: string;
  subject: string;
  message: string;
  status: 'Pending' | 'Resolved';
  date: string;
  response?: string;
}
