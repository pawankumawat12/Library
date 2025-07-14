
"use client";

import { useState } from "react";
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
import { Book } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ADMIN_EMAIL = "pawankumawat9009@gmail.com";

const registerFormSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z
    .string()
    .email("Please enter a valid email.")
    .refine((email) => email.toLowerCase() === ADMIN_EMAIL, {
      message: "This email address is not authorized for registration.",
    }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long."),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [mockOtp, setMockOtp] = useState("");

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleRegisterDetails = (values: RegisterFormValues) => {
    // In a real app, you would call your backend to send an OTP email.
    // For now, we'll generate a mock OTP and show it.
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setMockOtp(generatedOtp);
    console.log(`OTP for ${values.email} is: ${generatedOtp}`);
    toast({
      title: "OTP Sent",
      description: "A one-time password has been sent to your email.",
    });
    setStep(2);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === mockOtp) {
      toast({
        title: "Registration Successful!",
        description: "Redirecting to your dashboard.",
      });
      // Mock register logic
      if (typeof window !== "undefined") {
        localStorage.setItem("isAdminLoggedIn", "true");
      }
      router.push("/admin/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link
            href="/"
            className="flex justify-center items-center gap-2 font-bold text-2xl mb-2"
          >
            <Book className="h-8 w-8 text-primary" />
            <span>MyLibrary Hub Lite</span>
          </Link>
          <CardTitle>
            {step === 1 ? "Create an Admin Account" : "Verify OTP"}
          </CardTitle>
          <CardDescription>
            {step === 1
              ? "Fill in the details below to register."
              : `An OTP has been sent to ${ADMIN_EMAIL}.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockOtp && step === 2 && (
            <Alert className="mb-4">
              <AlertTitle>Testing Only: OTP Generated</AlertTitle>
              <AlertDescription>
                The OTP for {ADMIN_EMAIL} is:{" "}
                <span className="font-bold">{mockOtp}</span>
              </AlertDescription>
            </Alert>
          )}

          {step === 1 ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleRegisterDetails)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Pawan Kumawat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={ADMIN_EMAIL}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </Form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <FormLabel htmlFor="otp">Enter OTP</FormLabel>
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button type="submit" className="w-full">
                Verify and Complete Registration
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
