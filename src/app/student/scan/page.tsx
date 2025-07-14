"use client";

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const QrScanner = dynamic(() => import('react-qr-scanner'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>,
});

const MOCK_QR_CODE_VALUE = "https://mylibraryhub.com/student/scan";

type CheckInState = 'scanning' | 'checked_out' | 'checked_in';

export default function ScanPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [seatNumber, setSeatNumber] = useState('');
  const [checkInState, setCheckInState] = useState<CheckInState>('scanning');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedState = localStorage.getItem('checkInState');
    const storedSeat = localStorage.getItem('seatNumber');
    if (storedState === 'checked_in' && storedSeat) {
      setCheckInState('checked_in');
      setSeatNumber(storedSeat);
    }
  }, []);

  const handleScan = (data: { text: string } | null) => {
    if (data && data.text === MOCK_QR_CODE_VALUE) {
      const storedState = localStorage.getItem('checkInState');
      if (storedState === 'checked_in') {
        setCheckInState('checked_in');
      } else {
        setCheckInState('checked_out');
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setError("Could not access camera. Please enable camera permissions in your browser settings.");
  };

  const handleCheckIn = () => {
    if (!seatNumber) {
      toast({ title: "Error", description: "Please enter a seat number.", variant: "destructive" });
      return;
    }
    localStorage.setItem('checkInState', 'checked_in');
    localStorage.setItem('seatNumber', seatNumber);
    setCheckInState('checked_in');
    toast({ title: "Success", description: `Checked in to seat ${seatNumber}.` });
  };
  
  const handleCheckOut = () => {
    localStorage.removeItem('checkInState');
    localStorage.removeItem('seatNumber');
    const checkedOutSeat = seatNumber;
    setSeatNumber('');
    setCheckInState('scanning');
    toast({ title: "Success", description: `Checked out from seat ${checkedOutSeat}.` });
     router.push('/');
  };

  const renderContent = () => {
    switch (checkInState) {
      case 'scanning':
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle>Scan QR Code</CardTitle>
              <CardDescription>
                Point your camera at the library's QR code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <Alert variant="destructive">
                  <AlertTitle>Camera Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <div className="w-full aspect-square bg-muted rounded-lg overflow-hidden">
                  <QrScanner
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                  />
                </div>
              )}
            </CardContent>
          </>
        );
      case 'checked_out': // Now means ready to check in
        return (
           <>
            <CardHeader className="text-center">
              <CardTitle>Check In</CardTitle>
              <CardDescription>
                QR code scanned successfully. Please enter your seat number to check in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seatNumber">Seat Number</Label>
                <Input
                  id="seatNumber"
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                  placeholder="e.g. A12"
                />
              </div>
               <Button onClick={handleCheckIn} className="w-full">Check In</Button>
            </CardContent>
          </>
        );
      case 'checked_in':
        return (
           <>
            <CardHeader className="text-center">
              <CardTitle>You are Checked In</CardTitle>
              <CardDescription>
                You are currently checked in at seat <span className="font-bold">{seatNumber}</span>.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Button onClick={handleCheckOut} className="w-full" variant="outline">Check Out</Button>
            </CardContent>
          </>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md">
        {renderContent()}
        <CardFooter>
            <Button variant="link" className="w-full" onClick={() => router.push('/')}>Back to Home</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
