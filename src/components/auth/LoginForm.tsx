import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { app } from "@/firebase/client";
import { getAppUrl } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, MailCheck } from "lucide-react";
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
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(app);
const firestore = getFirestore(app);

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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
  const [lastVerificationSent, setLastVerificationSent] = useState<number | null>(null);

  useEffect(() => {
    const lastSent = localStorage.getItem("email_verification_sent_at");
    if (lastSent) setLastVerificationSent(Number(lastSent));
  }, []);

  const sendVerificationEmail = async (user: any) => {
    try {
      await sendEmailVerification(user, {
        url: `${getAppUrl()}/auth/action`,
        handleCodeInApp: true,
      });
      localStorage.setItem("email_verification_sent_at", Date.now().toString());
      setLastVerificationSent(Date.now());
      toast.success("Confirmation email sent. Check your inbox.");
    } catch (error) {
      console.error("Failed to resend verification:", error);
      toast.error("Failed to send confirmation email. Try again later.");
    }
  };

  const canResend = () => {
    if (!lastVerificationSent) return true;
    const now = Date.now();
    return now - lastVerificationSent > 60_000; // 1 minute cooldown
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        if (canResend()) {
          await sendVerificationEmail(user);
        } else {
          toast.warning("Your email is not verified. Please check your inbox.");
        }

        await signOut(auth);
        setLoading(false);
        return;
      }

      const userDoc = await getDoc(doc(firestore, "users", user.uid));

      if (!userDoc.exists()) {
        toast.error("Account not found in database.");
        await signOut(auth);
        setLoading(false);
        return;
      }

      const userData = userDoc.data();
      if (!userData.isActive) {
        toast.error("Your account is not yet approved by an admin.");
        await signOut(auth);
        window.location.href = "/auth/not-verified";
        return;
      }

      const idToken = await user.getIdToken();
      const response = await fetch("/api/auth/signin", {
        method: "GET",
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (response.redirected) {
        toast.success("Welcome back! Redirecting...");
        window.location.assign(response.url);
      } else {
        toast.success("Login successful!");
      }
    } catch (error: any) {
      console.error("Login error:", error);

      const code = error.code || "auth/unknown";
      const errorMessages: Record<string, string> = {
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/invalid-email": "The email address is invalid.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/user-disabled": "This account has been disabled by an administrator.",
        "auth/network-request-failed": "Network error. Please check your internet connection.",
        "auth/internal-error": "Unexpected server error. Please try again later.",
        "auth/operation-not-allowed": "This sign-in method is not allowed.",
        "auth/invalid-credential": "Invalid login credentials. Please try again.",
      };

      const message = errorMessages[code] || "Login failed. Please try again.";

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
          <CardTitle className="text-xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
                      <Label>Password</Label>
                      <a href="/auth/forgot-password" className="text-sm underline-offset-4 hover:underline">
                        Forgot your password?
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

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-sm">
                Don't have an account?{' '}
                <a href="/auth/register" className="underline underline-offset-4">Sign up</a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
