import { useEffect, useState } from "react";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { toast } from "sonner";
import { app } from "@/firebase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const COOLDOWN_KEY = "email_verification_sent_at";

export default function ResendEmailValidation() {
  const auth = getAuth(app);

  const [userReady, setUserReady] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Wait for the current user to be ready
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserReady(true);
    });
    return () => unsubscribe();
  }, [auth]);

  // Manage cooldown timer
  useEffect(() => {
    const lastSent = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
    const now = Date.now();
    const diff = now - lastSent;

    if (diff < 60_000) {
      const remaining = 60 - Math.floor(diff / 1000);
      setCooldown(true);
      setSecondsLeft(remaining);

      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCooldown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const handleResend = async () => {
    const user = auth.currentUser;

    if (!user) {
      toast.error("Benutzer nicht gefunden. Bitte erneut anmelden.");
      return;
    }

    if (cooldown) {
      toast.warning("Bitte warte, bevor du es erneut versuchst.");
      return;
    }

    setLoading(true);

    try {
      await user.reload();
      if (user.emailVerified) {
        toast.success("Deine E-Mail ist bereits verifiziert! Du kannst dich jetzt anmelden.");
        window.location.href = "/auth/login";
        return;
      }

      await sendEmailVerification(user, {
        url: `${window.location.origin}/auth/action`,
        handleCodeInApp: true,
      });

      const now = Date.now();
      localStorage.setItem(COOLDOWN_KEY, now.toString());
      setCooldown(true);
      setSecondsLeft(60);

      toast.success("Verifizierungs-E-Mail gesendet!");
    } catch (err) {
      console.error(err);
      toast.error("Die Verifizierungs-E-Mail konnte nicht gesendet werden.");
    } finally {
      setLoading(false);
    }
  };

  if (!userReady) return null;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl flex items-center justify-center font-bold gap-2">
            <AlertCircle size={24} className="text-yellow-500" />
            Diese Email ist nicht verifiziert
          </CardTitle>
          <CardDescription>
            Bitte überprüfe dein Postfach auf eine Verifizierungs-E-Mail. Falls du diese nicht finden kannst, überprüfe deinen Spam-Ordner oder fordere eine neue Email an.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0 flex flex-col gap-4">
          <Button
            className="w-full"
            onClick={handleResend}
            disabled={loading || cooldown}
          >
            {loading
              ? "wird gesendet..."
              : cooldown
              ? `Warte ${secondsLeft}s`
              : "Verifizierungs-E-Mail erneut senden"}
          </Button>

          <form action="/api/auth/signout">
            <Button
              type="submit"
              variant="link"
              className="w-full cursor-pointer"
            >
              Zurück zum Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
      Brauchst du Hilfe? <a href="mailto:Marc.Feigl@erlenhof-bl.ch">Support kontaktieren</a>
      </div>
    </div>
  );
}