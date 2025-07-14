"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book, ScanLine } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudentCheckInPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Link
        href="/"
        className="flex items-center gap-2 font-bold text-2xl mb-4"
      >
        <Book className="h-8 w-8 text-primary" />
        <span>MyLibrary Hub Lite</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ScanLine className="h-12 w-12 text-primary" />
          </div>
          <CardTitle>Student Check-in / Check-out</CardTitle>
          <CardDescription>
            Scan the library's QR code to begin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" size="lg" onClick={() => router.push('/student/scan')}>
            <ScanLine className="mr-2 h-5 w-5" />
            Scan QR Code
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
