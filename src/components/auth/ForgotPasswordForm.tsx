// src/components/auth/ForgotPasswordForm.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail, type AuthError } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "@/firebase/client";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { getAppUrl } from "@/lib/utils";

const auth = getAuth(app);
const db = getFirestore(app);

// Schema de validação
const schema = z.object({
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
});
type ForgotPasswordFormData = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log("Starting reset flow for:", data.email);
    setLoading(true);

    try {


      // 2) Envia o e-mail de reset
      console.log("Sending reset e-mail to:", data.email);
      await sendPasswordResetEmail(auth, data.email, {
        url: `${getAppUrl()}/auth/action`,
        handleCodeInApp: true,
      });

      console.log("Reset e-mail sent to:", data.email);
      toast.success(
        "Wenn dieses Konto existiert, haben wir Ihnen eine E-Mail geschickt, um Ihr Passwort zurückzusetzen. Wenn Sie die E-Mail nicht innerhalb von 5 Minuten erhalten, versuchen Sie es erneut oder vergewissern Sie sich, dass Sie ein Konto registriert haben."
      );
    } catch (err: unknown) {
      console.error("Error sending reset e-mail:", err);
      const authErr = err as AuthError;
      console.error("[forgot] sendPasswordResetEmail failed:", authErr.code, authErr.message);
      switch (authErr.code) {
        case "auth/invalid-email":
          toast.error("Ungültige E-Mail-Adresse.");
          break;
        case "auth/unauthorized-continue-uri":
        case "auth/invalid-continue-uri":
          toast.error("Konfiguration der Rücksetz-URL fehlerhaft. Bitte Admin kontaktieren.");
          break;
        case "auth/too-many-requests":
          toast.error("Zu viele Anfragen. Bitte später erneut versuchen.");
          break;
        default:
          toast.error("Fehler beim Senden der E-Mail. Bitte versuchen Sie es erneut.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Passwort zurücksetzen</CardTitle>
          <CardDescription>
            Geben Sie Ihre E-Mail-Adresse ein, um einen Link zum Zurücksetzen zu erhalten.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>E-Mail</Label>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@beispiel.de"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Sende..." : "Link zum Zurücksetzen senden"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        Benötigen Sie Hilfe?{" "}
        <a
          href="/auth/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Zurück zur Anmeldung
        </a>
      </div>
    </div>
  );
}
