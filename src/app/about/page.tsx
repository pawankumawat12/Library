import { SiteHeader } from "@/components/site-header";
import { BookText, Target, Users } from "lucide-react";
import { mockBooks } from "@/data/books";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function AboutPage() {
  const featuredBooks = mockBooks.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                About MyLibrary Hub Lite
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Empowering small libraries with modern, simple, and efficient
                management tools.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold tracking-tighter">
                Streamlining Library Operations
              </h2>
              <p className="text-muted-foreground">
                MyLibrary Hub Lite was born from a simple idea: library
                management shouldn't be complicated or expensive. We aim to
                provide an intuitive, AI-enhanced platform that helps librarians
                focus on what matters most—fostering a love for reading and
                learning in their community.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://placehold.co/550x310.png"
                width="550"
                height="310"
                alt="Our Mission"
                data-ai-hint="team working"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
              />
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
               <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                Featured Books
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                From Our Collection
              </h2>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              {featuredBooks.map((book) => (
                 <Card key={book.id}>
                  <CardHeader>
                    <img
                      src={`https://placehold.co/600x400.png`}
                      width="600"
                      height="400"
                      alt={book.title}
                      data-ai-hint="book cover"
                      className="aspect-[4/3] w-full overflow-hidden rounded-t-lg object-cover"
                    />
                     <CardTitle className="pt-4">{book.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="flex justify-center mt-12">
               <Button asChild>
                 <Link href="/admin/dashboard">Manage Collection</Link>
               </Button>
            </div>
          </div>
        </section>


        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Our Values
              </h2>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-1 text-center">
                <BookText className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Simplicity</h3>
                <p className="text-sm text-muted-foreground">
                  We believe in powerful tools that are easy to use. No steep
                  learning curves, just straightforward functionality.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Target className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  Making modern technology available to libraries of all sizes,
                  ensuring everyone has a chance to thrive.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Users className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Building a supportive network of users and continuously
                  improving based on real-world feedback.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 MyLibrary Hub Lite. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
