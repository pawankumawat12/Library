import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    title: "The Future of Libraries: Embracing AI",
    date: "August 5, 2024",
    description: "Discover how Artificial Intelligence is revolutionizing library management, from smart catalogs to automated check-ins.",
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "robot reading",
    }
  },
  {
    title: "5 Tips for Preventing Duplicate Book Entries",
    date: "July 22, 2024",
    description: "Keep your catalog clean and accurate. Our AI-powered system helps, but these manual tips are essential for every librarian.",
     image: {
      src: "https://placehold.co/600x400.png",
      hint: "books organized",
    }
  },
  {
    title: "Community Spotlight: The Little Free Library Project",
    date: "July 10, 2024",
    description: "Learn how small, community-driven libraries are making a huge impact on local literacy and engagement.",
     image: {
      src: "https://placehold.co/600x400.png",
      hint: "community library",
    }
  },
];


export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                The Library Log
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                News, tips, and stories from the world of library science and
                MyLibrary Hub.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Card key={post.title}>
                  <CardHeader>
                    <img
                      src={post.image.src}
                      width="600"
                      height="400"
                      alt={post.title}
                      data-ai-hint={post.image.hint}
                      className="aspect-video w-full overflow-hidden rounded-t-lg object-cover"
                    />
                    <CardTitle className="pt-4">{post.title}</CardTitle>
                    <CardDescription>{post.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{post.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" asChild className="p-0 h-auto">
                      <Link href="#">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
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
