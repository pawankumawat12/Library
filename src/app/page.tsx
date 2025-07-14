
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { Book, QrCode, UserCog, Award } from "lucide-react";
import Link from "next/link";
import { mockSuccessStories } from "@/data/success-stories";

const DEFAULT_LIBRARY_NAME = "MyLibrary Hub Lite";

export default function Home() {
  const [libraryName, setLibraryName] = useState(DEFAULT_LIBRARY_NAME);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedName = localStorage.getItem("libraryName");
    if (savedName) {
      setLibraryName(savedName);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Welcome to {isClient ? libraryName : DEFAULT_LIBRARY_NAME}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A streamlined library management system for modern
                    educational institutions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/student/check-in">Student Check-in</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/auth/login">Admin Portal</Link>
                  </Button>
                </div>
              </div>
              <img
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Library"
                data-ai-hint="library books"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Core Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything you need, nothing you don't.
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  MyLibrary Hub Lite provides essential features for efficient
                  library management.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              <Card>
                <CardHeader className="items-center">
                  <QrCode className="h-10 w-10 text-primary" />
                  <CardTitle>QR Code Check-in</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Effortless seat check-in and check-out for students using QR
                    codes.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <Book className="h-10 w-10 text-primary" />
                  <CardTitle>AI-Assisted Entry</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Prevent duplicate book entries with our smart, AI-powered
                    flagging system.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <UserCog className="h-10 w-10 text-primary" />
                  <CardTitle>Admin Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Comprehensive book management and stock monitoring for
                    administrators.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                Wall of Fame
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Successful Students
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Celebrating the achievements of our dedicated students.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              {mockSuccessStories.map((story) => (
                <Card key={story.id} className="flex flex-col">
                  <CardHeader>
                    <img
                      src={story.imageUrl}
                      width="600"
                      height="400"
                      alt={story.studentName}
                      data-ai-hint="person portrait"
                      className="aspect-video w-full overflow-hidden rounded-t-lg object-cover"
                    />
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col items-center text-center">
                    <h3 className="text-lg font-bold">{story.studentName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {story.achievement}
                    </p>
                  </CardContent>
                   <CardFooter className="justify-center">
                      <Award className="h-6 w-6 text-primary" />
                  </CardFooter>
                </Card>
              ))}
            </div>
             <div className="flex justify-center mt-12">
               <Button asChild>
                 <Link href="/admin/dashboard">Manage Success Stories</Link>
               </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 {isClient ? libraryName : DEFAULT_LIBRARY_NAME}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
