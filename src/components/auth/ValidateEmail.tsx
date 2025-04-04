import { useEffect, useState } from "react";
import { app } from "@/firebase/client";
import { getAuth, applyActionCode } from "firebase/auth";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function ValidateEmail() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const verifyEmail = async () => {
      const auth = getAuth(app);
      const params = new URLSearchParams(window.location.search);
      const oobCode = params.get("oobCode");

      if (!oobCode) {
        setStatus("error");
        return;
      }

      try {
        await applyActionCode(auth, oobCode);
        setStatus("success");
        toast.success("Email successfully verified!");
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("error");
        toast.error("Invalid or expired verification link.");
      }
    };

    verifyEmail();
  }, []);

  useEffect(() => {
    if (status !== "success") return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          window.location.href = "/auth/login";
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        {status === "verifying" && (
          <>
          <CardHeader className="text-center">
            <CardTitle className="text-xl"><LoaderCircle className="animate-spin" /></CardTitle>
            <CardDescription>
            <p>Verifying your email...</p>
            </CardDescription>
          </CardHeader>
          </>
        )}

        {status === "success" && (
          <>
          <CardHeader className="text-center">
            <CardTitle className="text-xl"><h2 className="text-xl font-bold text-green-600">Email verified ✅</h2></CardTitle>
            <CardDescription>
              <p>You’ll be redirected to login in <strong>{countdown}</strong> seconds.</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 flex justify-center items-center w-full">
            <Button onClick={() => window.location.href = "/auth/login"} className="cursor-pointer">Go to Login Now</Button>
          </CardContent>
          </>
        )}

        {status === "error" && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-xl"><h2 className="text-xl font-bold text-red-500">Verification failed ❌</h2></CardTitle>
              <CardDescription>
              <p>This link may be invalid or expired.</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex justify-center items-center w-full">
              <Button onClick={() => window.location.href = "/auth/login"} className="cursor-pointer">Go to Login Now</Button>
            </CardContent>
          </>
        )}

      </Card>
    </div>
  );
}
