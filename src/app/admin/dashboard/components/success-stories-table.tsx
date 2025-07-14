"use client";

import { useState } from "react";
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { SuccessStory } from "@/lib/types";
import { AddSuccessStoryDialog } from "./add-success-story-dialog";
import { EditSuccessStoryDialog } from "./edit-success-story-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SuccessStoriesTableProps {
  stories: SuccessStory[];
  onStoryAdded: (newStory: SuccessStory) => void;
  onStoryEdited: (editedStory: SuccessStory) => void;
  onStoryDeleted: (storyId: string) => void;
}

export function SuccessStoriesTable({ stories, onStoryAdded, onStoryEdited, onStoryDeleted }: SuccessStoriesTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const { toast } = useToast();

  const handleEditClick = (story: SuccessStory) => {
    setSelectedStory(story);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (story: SuccessStory) => {
    setSelectedStory(story);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedStory) return;
    onStoryDeleted(selectedStory.id);
    toast({
      title: "Deleted",
      description: `Success story for "${selectedStory.studentName}" has been removed.`,
    });
    setIsDeleteDialogOpen(false);
    setSelectedStory(null);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Success Stories</CardTitle>
            <CardDescription>Celebrate your students' achievements.</CardDescription>
          </div>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Story
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Achievement</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stories.map((story) => (
                <TableRow key={story.id}>
                  <TableCell className="font-medium flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={story.imageUrl} alt={story.studentName} data-ai-hint="person portrait" />
                      <AvatarFallback>{story.studentName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {story.studentName}
                  </TableCell>
                  <TableCell>{story.achievement}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditClick(story)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(story)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddSuccessStoryDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        onStoryAdded={onStoryAdded}
      />
      
      {selectedStory && (
        <EditSuccessStoryDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          onStoryEdited={onStoryEdited}
          storyToEdit={selectedStory}
        />
      )}


      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the success story for "
              {selectedStory?.studentName}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedStory(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
