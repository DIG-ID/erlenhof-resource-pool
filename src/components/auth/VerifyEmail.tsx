import { useEffect, useState } from "react";
import { app } from "@/firebase/client";
import { getAuth, applyActionCode } from "firebase/auth";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
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
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center px-4">
      {status === "verifying" && (
        <>
          <LoaderCircle className="animate-spin" />
          <p>Verifying your email...</p>
        </>
      )}

      {status === "success" && (
        <>
          <h2 className="text-xl font-bold text-green-600">Email verified ✅</h2>
          <p>You’ll be redirected to login in <strong>{countdown}</strong> seconds.</p>
          <Button onClick={() => window.location.href = "/auth/login"}>Go to Login Now</Button>
        </>
      )}

      {status === "error" && (
        <>
          <h2 className="text-xl font-bold text-red-500">Verification failed ❌</h2>
          <p>This link may be invalid or expired.</p>
          <Button onClick={() => window.location.href = "/auth/login"}>Back to Login</Button>
        </>
      )}
    </div>
  );
}
