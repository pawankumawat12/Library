
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Complaint } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ComplaintsTableProps {
  complaints: Complaint[];
  setComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>;
}

export function ComplaintsTable({ complaints, setComplaints }: ComplaintsTableProps) {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [response, setResponse] = useState("");
  const { toast } = useToast();

  const handleViewClick = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setResponse(complaint.response || "");
    setIsDialogOpen(true);
  };
  
  const handleRespond = () => {
    if (!selectedComplaint) return;
    if (!response.trim()) {
      toast({
        title: "Error",
        description: "Response cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    setComplaints(prev => prev.map(c => 
      c.id === selectedComplaint.id 
        ? { ...c, status: 'Resolved', response } 
        : c
    ));
    
    toast({
      title: "Success",
      description: "Response sent and complaint marked as resolved.",
    });

    setIsDialogOpen(false);
    setSelectedComplaint(null);
    setResponse("");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Student Complaints</CardTitle>
          <CardDescription>View and respond to student messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">{complaint.studentName}</TableCell>
                  <TableCell>{complaint.subject}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={complaint.status === 'Resolved' ? 'secondary' : 'destructive'}>
                      {complaint.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{complaint.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleViewClick(complaint)}>
                      {complaint.status === 'Pending' ? 'Respond' : 'View'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>
              From: {selectedComplaint?.studentEmail} | {selectedComplaint?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <Label className="font-semibold">Subject</Label>
              <p className="text-sm text-muted-foreground">{selectedComplaint?.subject}</p>
            </div>
            <div className="space-y-1">
              <Label className="font-semibold">Message</Label>
              <p className="text-sm text-muted-foreground p-3 bg-secondary rounded-md">
                {selectedComplaint?.message}
              </p>
            </div>
             <div className="space-y-2">
              <Label htmlFor="response" className={cn(selectedComplaint?.status === 'Resolved' && "font-semibold")}>
                {selectedComplaint?.status === 'Resolved' ? 'Your Response' : 'Respond to Student'}
              </Label>
              <Textarea
                id="response"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your response here..."
                disabled={selectedComplaint?.status === 'Resolved'}
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
            {selectedComplaint?.status === 'Pending' && (
              <Button onClick={handleRespond}>Send Response & Mark as Resolved</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
