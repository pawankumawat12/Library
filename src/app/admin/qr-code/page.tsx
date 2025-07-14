"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode.react";

export default function QRCodePage() {
  const qrValue = "https://mylibraryhub.com/student/scan";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold">Library QR Code</h1>
        <p className="text-muted-foreground">
          Students can scan this code to check-in or check-out.
        </p>
      </div>
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Library Check-in/Check-out</CardTitle>
          <CardDescription>
            Scan this code with your device's camera.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="p-4 bg-white rounded-lg">
             <QRCode value={qrValue} size={256} level="H" />
          </div>
          <Button onClick={handlePrint}>Print QR Code</Button>
        </CardContent>
      </Card>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-qr, .printable-qr * {
            visibility: visible;
          }
          .printable-qr {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      `}</style>
      <div className="printable-qr" style={{ display: 'none' }}>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">Scan to Check-in/out</h1>
           <QRCode value={qrValue} size={400} level="H" />
        </div>
      </div>
    </div>
  );
}
