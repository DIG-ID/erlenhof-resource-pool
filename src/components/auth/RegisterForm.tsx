import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/lib/schemas/register";
import {
  getAuth,
  validatePassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { app } from "@/firebase/client";
import { sleep, getAppUrl } from "@/lib/utils";
import debounce from "lodash.debounce";
import { toast } from "sonner";

import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInputField } from "@/components/PhoneInputField";


const auth = getAuth(app);

export default function RegisterForm() {
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);


  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      surname: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Live Firebase password policy validation
  const validateLivePassword = async (password: string) => {
    if (!password) {
      setPasswordErrors([]);
      return;
    }

    try {
      const status = await validatePassword(auth, password);
      let errors = [];

      if (!status.containsLowercaseLetter)
        errors.push("• Must contain at least one lowercase letter.");
      if (!status.containsUppercaseLetter)
        errors.push("• Must contain at least one uppercase letter.");
      if (!status.containsNumericCharacter)
        errors.push("• Must contain at least one number.");
      if (!status.containsNonAlphanumericCharacter)
        errors.push("• Must contain at least one special character (!@#$%).");

      setPasswordErrors(errors);
    } catch (error) {
      console.error("❌ Error validating password:", error);
      setPasswordErrors(["Error validating password. Try again."]);
    }
  };

  const onSubmit = async (data: RegisterSchema) => {
    setLoading(true);
    setServerError("");

    if (passwordErrors.length > 0) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const result = isJson ? await response.json() : null;

      if (!response.ok) {
        throw new Error(result?.error || "Error creating account.");
      }

      // Wait a moment to ensure account is created
      await sleep(1000);

      // Log in and send verification email
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user, {
          url: `${getAppUrl()}/auth/action`,
          handleCodeInApp: true,
        });
        
      }

      let seconds = 5;
      setCountdown(seconds);
      
      const interval = setInterval(() => {
        seconds--;
        setCountdown(seconds);
      
        if (seconds === 0) {
          clearInterval(interval);
          window.location.href = "/auth/login";
        }
      }, 1000);
      
      toast.success(`Account created! Please verify your email before logging in.\nRedirecting in ${seconds} seconds...`, { duration: 6000 });
      

    } catch (error: any) {
      toast.error(error.message || "Unexpected error.");
      setServerError(error.message || "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create New Account</CardTitle>
          <CardDescription>
            Enter your details below to create your new account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Name</Label>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Surname */}
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Surname</Label>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <PhoneInputField
                name="phoneNumber"
                label="Phone Number"
                control={form.control}
                defaultCountry="CH"
              />

              {/* Email */}
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

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Password</Label>
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
                          onClick={() => setShowPassword((prev) => !prev)}
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

              {/* Live password feedback */}
              {passwordErrors.length > 0 && (
                <Alert variant="destructive">
                  <AlertDescription style={{ whiteSpace: "pre-line" }}>
                    {passwordErrors.join("\n")}
                  </AlertDescription>
                </Alert>
              )}

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label>Confirm Password</Label>
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
                            setShowConfirmPassword((prev) => !prev)
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

              {/* Server error */}
              {serverError && (
                <Alert variant="destructive">
                  <AlertDescription>{serverError}</AlertDescription>
                </Alert>
              )}

              {/* Submit */}
              <Button
                type="button"
                disabled={loading}
                onClick={debounce(() => form.handleSubmit(onSubmit)(), 500)}
                className={`w-full cursor-pointer ${loading ? "opacity-50 pointer-events-none" : ""}`}
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
