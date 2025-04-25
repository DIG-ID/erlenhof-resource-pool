import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from "firebase/auth";
import { app } from "@/firebase/client";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

const auth = getAuth(app);
const firestore = getFirestore(app);

const schema = z.object({
  email: z.string().email("Ungültige E-Mail-Adresse"),
  password: z.string().min(6, "Das Passwort muss mindestens 6 Zeichen lang sein"),
});

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(firestore, "users", user.uid));

      if (!userDoc.exists()) {
        toast.error("Konto nicht in der Datenbank gefunden.");
        await signOut(auth);
        setLoading(false);
        return;
      }

      const idToken = await user.getIdToken();
      const response = await fetch("/api/auth/signin", {
        method: "GET",
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (response.redirected) {
        toast.success("Anmeldung erfolgreich!");
        window.location.assign(response.url);
      }
    } catch (error: any) {
      console.error("Login error:", error);

      const code = error.code || "auth/unknown";
      const errorMessages: Record<string, string> = {
        "auth/user-not-found": "Kein Konto mit dieser E-Mail-Adresse gefunden.",
        "auth/wrong-password": "Falsches Passwort. Bitte versuche es erneut.",
        "auth/invalid-email": "Die E-Mail-Adresse ist ungültig.",
        "auth/too-many-requests": "Zu viele Versuche. Bitte versuche es später erneut.",
        "auth/user-disabled": "Dieses Konto wurde von einem Administrator deaktiviert.",
        "auth/network-request-failed": "Netzwerkfehler. Bitte überprüfe deine Internetverbindung.",
        "auth/internal-error": "Unerwarteter Serverfehler. Bitte versuche es später erneut.",
        "auth/operation-not-allowed": "Diese Anmeldemethode ist nicht erlaubt.",
        "auth/invalid-credential": "Ungültige Anmeldedaten. Bitte versuche es erneut.",
      };

      const message = errorMessages[code] || "Anmeldung fehlgeschlagen. Bitte versuche es erneut.";

      if (code === "auth/user-not-found" || code === "auth/invalid-email") {
        form.setError("email", { message });
      } else if (code === "auth/wrong-password") {
        form.setError("password", { message });
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Melden Sie sich bei Ihrem Konto an</CardTitle>
          <CardDescription>
            Geben Sie unten Ihre E-Mail-Adresse ein, um sich bei Ihrem Konto anzumelden.
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
                    <Label>Email</Label>
                    <FormControl>
                      <Input type="email" {...field} />
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
                    <div className="flex items-center justify-between">
                      <Label>Passwort</Label>
                      <a href="/auth/forgot-password" className="text-sm underline-offset-4 hover:underline">
                        Passwort vergessen?
                      </a>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2 text-gray-500"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading} className="w-full cursor-pointer">
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-sm">
                Du hast kein Konto?{' '}
                <a href="/auth/register" className="underline underline-offset-4">Registrieren</a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Wenn Sie auf „Weiter“ klicken, stimmen Sie unseren <a href="#">Nutzungsbedingungen</a> und unserer <a href="#">Datenschutzerklärung</a> zu.
      </div>
    </div>
  );
}
