
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/complaints", label: "Complaints" },
];

const DEFAULT_LIBRARY_NAME = "MyLibrary Hub";

export function SiteHeader() {
  const pathname = usePathname();
  const [libraryName, setLibraryName] = useState(DEFAULT_LIBRARY_NAME);
  const [logoUrl, setLogoUrl] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedName = localStorage.getItem("libraryName");
    const savedLogo = localStorage.getItem("logoUrl");
    if (savedName) setLibraryName(savedName);
    if (savedLogo) setLogoUrl(savedLogo);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            {isClient && logoUrl ? (
               <Avatar className="h-7 w-7">
                <AvatarImage src={logoUrl} alt={libraryName} />
                <AvatarFallback>{libraryName.charAt(0)}</AvatarFallback>
              </Avatar>
            ) : (
              <Book className="h-6 w-6 text-primary" />
            )}
            <span>{isClient ? libraryName : DEFAULT_LIBRARY_NAME}</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
          <Button asChild>
            <Link href="/auth/login">Admin Login</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden px-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-2 py-1 text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
