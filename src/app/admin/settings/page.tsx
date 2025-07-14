
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Book, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [libraryName, setLibraryName] = useState("MyLibrary Hub Lite");
  const [totalSeats, setTotalSeats] = useState(50);
  const [logoUrl, setLogoUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedName = localStorage.getItem("libraryName");
    const savedSeats = localStorage.getItem("totalSeats");
    const savedLogo = localStorage.getItem("logoUrl");

    if (savedName) setLibraryName(savedName);
    if (savedSeats) setTotalSeats(parseInt(savedSeats, 10));
    if (savedLogo) setLogoUrl(savedLogo);
  }, []);

  const handleSaveChanges = () => {
    localStorage.setItem("libraryName", libraryName);
    localStorage.setItem("totalSeats", totalSeats.toString());
    localStorage.setItem("logoUrl", logoUrl);
    // Dispatch a storage event to notify other components like the layout
    window.dispatchEvent(new Event("storage"));
    toast({
      title: "Success",
      description: "Your library settings have been saved.",
    });
  };

  const handleDeleteLogo = () => {
    setLogoUrl("");
    localStorage.removeItem("logoUrl");
     window.dispatchEvent(new Event("storage"));
    toast({
      title: "Logo Removed",
      description: "Your library logo has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your library settings.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Library Configuration</CardTitle>
          <CardDescription>
            Update general library information and rules.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="library-name">Library Name</Label>
            <Input
              id="library-name"
              value={libraryName}
              onChange={(e) => setLibraryName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total-seats">Total Seats</Label>
            <Input
              id="total-seats"
              type="number"
              value={totalSeats}
              onChange={(e) => setTotalSeats(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo-url">Library Logo URL</Label>
            <div className="flex items-center gap-4">
              {logoUrl ? (
                <Avatar>
                  <AvatarImage src={logoUrl} alt="Library Logo" />
                  <AvatarFallback>{libraryName.charAt(0)}</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar>
                   <AvatarFallback>
                      <Book className="h-5 w-5"/>
                   </AvatarFallback>
                </Avatar>
              )}
              <Input
                id="logo-url"
                placeholder="https://placehold.co/40x40.png"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
              />
              {logoUrl && (
                <Button variant="outline" size="icon" onClick={handleDeleteLogo}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete Logo</span>
                </Button>
              )}
            </div>
             <p className="text-xs text-muted-foreground pt-1">
                Enter a URL for your library's logo. If empty, a default icon will be used.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
