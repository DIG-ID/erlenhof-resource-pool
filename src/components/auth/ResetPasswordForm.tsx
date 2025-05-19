// src/components/auth/ResetPasswordForm.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getAuth,
  confirmPasswordReset,
  validatePassword,
  type AuthError,
} from "firebase/auth";
import { app } from "@/firebase/client";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAppUrl } from "@/lib/utils";

const auth = getAuth(app);

// 1) Schema mínimo (só para React Hook Form), mensagens em alemão
const schema = z
  .object({
    password: z
      .string()
      .min(6, "Passwort muss mindestens 6 Zeichen lang sein"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwörter stimmen nicht überein",
    path: ["confirmPassword"],
  });
type FormData = z.infer<typeof schema>;

export default function ResetPasswordForm() {
  const [oobCode, setOobCode] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [countdown, setCountdown] = useState(5);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 2) passwordErrors para live feedback
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { password: "", confirmPassword: "" },
  });

  // Extrair oobCode da query string
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("oobCode");
    if (!code) {
      toast.error("Ungültiger oder fehlender Reset-Code.");
      setStatus("error");
    } else {
      setOobCode(code);
    }
  }, []);

  // Contador de redireção após sucesso
  useEffect(() => {
    if (status !== "success") return;
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c === 1) {
          clearInterval(timer);
          window.location.href = "/auth/login";
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status]);

  // 3) Função de validação viva
  const validateLivePassword = async (pw: string) => {
    if (!pw) {
      setPasswordErrors([]);
      return;
    }
    try {
      // recebe o resultado completo
      const status = await validatePassword(auth, pw);
      const errs: string[] = [];

      if (!status.containsLowercaseLetter)
        errs.push("• Mindestens ein Kleinbuchstabe");
      if (!status.containsUppercaseLetter)
        errs.push("• Mindestens ein Großbuchstabe");
      if (!status.containsNumericCharacter)
        errs.push("• Mindestens eine Ziffer");
      if (!status.containsNonAlphanumericCharacter)
        errs.push("• Mindestens ein Sonderzeichen (!@#$%)");

      setPasswordErrors(errs);
    } catch (e) {
      console.error("Error validating password:", e);
      setPasswordErrors([
        "Fehler bei Passwortprüfung. Bitte erneut versuchen.",
      ]);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!oobCode) return;
    // 4) Impede submissão se live validation falhar
    if (passwordErrors.length > 0) {
      toast.error("Passwort entspricht nicht den Anforderungen.");
      return;
    }

    try {
      console.log("Sending confirmPasswordReset for code:", oobCode);
      await confirmPasswordReset(auth, oobCode, data.password);
      console.log("Password reset successful");
      toast.success("Passwort erfolgreich zurückgesetzt!");
      setStatus("success");
    } catch (err: unknown) {
      console.error("Password reset failed:", err);
      const code = (err as AuthError).code;
      switch (code) {
        case "auth/expired-action-code":
          toast.error("Der Link ist abgelaufen.");
          break;
        case "auth/invalid-action-code":
          toast.error("Ungültiger Link.");
          break;
        default:
          toast.error("Fehler beim Zurücksetzen des Passworts.");
      }
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Passwort zurücksetzen</CardTitle>
          <CardDescription>
            Geben Sie Ihr neues Passwort ein und bestätigen Sie es.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          {status === "success" ? (
            <div className="text-center space-y-3">
              <h3 className="text-green-600 font-semibold">
                Passwort erfolgreich zurückgesetzt ✅
              </h3>
              <p>
                Weiterleitung in{" "}
                <strong>{countdown}</strong> Sekunde
                {countdown !== 1 && "n"}…
              </p>
              <Button onClick={() => (window.location.href = "/auth/login")}>
                Jetzt anmelden
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Neues Passwort</Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              validateLivePassword(e.target.value);
                            }}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2 text-gray-500"
                            onClick={() => setShowPassword((s) => !s)}
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Feedback vivo de password */}
                {passwordErrors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertDescription style={{ whiteSpace: "pre-line" }}>
                      {passwordErrors.join("\n")}
                    </AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Passwort bestätigen</Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2 text-gray-500"
                            onClick={() =>
                              setShowConfirmPassword((s) => !s)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={status === "success" || form.formState.isSubmitting}
                  className="w-full"
                >
                  Passwort zurücksetzen
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
