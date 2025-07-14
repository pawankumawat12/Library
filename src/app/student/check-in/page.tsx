"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Book, QrCode } from "lucide-react";
import Link from "next/link";

export default function StudentCheckInPage() {
  const { toast } = useToast();

  const handleSubmit =
    (action: "check-in" | "check-out") => (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const seatNumberInput = form.elements.namedItem('seatNumber') as HTMLInputElement;
      const seatNumber = seatNumberInput.value;
      if (!seatNumber) {
        toast({
          title: "Error",
          description: "Please enter your seat number.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Success!",
        description: `You have successfully ${
          action === "check-in" ? "checked in" : "checked out"
        } from seat ${seatNumber}.`,
      });
      form.reset();
    };

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
            <QrCode className="h-12 w-12 text-primary" />
          </div>
          <CardTitle>Student Check-in / Check-out</CardTitle>
          <CardDescription>Enter your seat number to proceed.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seatNumber">Seat Number</Label>
              <Input
                id="seatNumber"
                name="seatNumber"
                type="text"
                placeholder="e.g., A12"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button type="submit" onClick={handleSubmit("check-in")}>
                Check In
              </Button>
              <Button
                type="submit"
                variant="outline"
                onClick={handleSubmit("check-out")}
              >
                Check Out
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
