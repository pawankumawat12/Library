
"use client";

import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Book, Home, Library, Settings, Users, QrCode } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DEFAULT_LIBRARY_NAME = "MyLibrary Hub";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

    const handleStorageChange = () => {
      const updatedName = localStorage.getItem("libraryName") || DEFAULT_LIBRARY_NAME;
      const updatedLogo = localStorage.getItem("logoUrl") || "";
      setLibraryName(updatedName);
      setLogoUrl(updatedLogo);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            {isClient && logoUrl ? (
              <Avatar className="h-7 w-7">
                <AvatarImage src={logoUrl} alt={libraryName} />
                <AvatarFallback>{libraryName.charAt(0)}</AvatarFallback>
              </Avatar>
            ) : (
              <Book className="w-6 h-6 text-primary" />
            )}
            <h1 className="font-semibold text-lg">{isClient ? libraryName : DEFAULT_LIBRARY_NAME}</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/admin/dashboard"}
              >
                <Link href="/admin/dashboard">
                  <Home />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/admin/dashboard"}
              >
                <Link href="/admin/dashboard">
                  <Library />
                  Books
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild
                isActive={pathname.startsWith("/admin/students")}
              >
                <Link href="/admin/students">
                  <Users />
                  Students
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton 
                asChild
                isActive={pathname.startsWith("/admin/qr-code")}
              >
                <Link href="/admin/qr-code">
                  <QrCode />
                  Library QR Code
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild
                isActive={pathname.startsWith("/admin/settings")}
              >
                <Link href="/admin/settings">
                  <Settings />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Avatar>
              <AvatarImage src="https://placehold.co/40x40.png" alt="@admin" data-ai-hint="person face"/>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
