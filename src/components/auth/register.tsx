import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getAuth, validatePassword } from "firebase/auth";
import { app } from "@/firebase/client";
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
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

const auth = getAuth(app);

export default function RegisterForm() {
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]); // Live password validation errors
  const [serverError, setServerError] = useState(""); // Backend errors
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 📌 **Zod Schema (Basic Validations)**
  const schema = z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      surname: z.string().min(2, "Surname must be at least 2 characters"),
      phoneNumber: z.string().regex(/^\d{9,15}$/, "Invalid phone number format"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(schema),
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

  // 📌 **Live Password Validation with Firebase**
  const validateLivePassword = async (password: string) => {
    if (!password) {
      setPasswordErrors([]);
      return;
    }

    try {
      const status = await validatePassword(auth, password);
      let errors = [];

      if (!status.containsLowercaseLetter) errors.push("• Must contain at least one lowercase letter.");
      if (!status.containsUppercaseLetter) errors.push("• Must contain at least one uppercase letter.");
      if (!status.containsNumericCharacter) errors.push("• Must contain at least one number.");
      if (!status.containsNonAlphanumericCharacter) errors.push("• Must contain at least one special character (!@#$%).");

      setPasswordErrors(errors);
    } catch (error) {
      console.error("❌ Error validating password:", error);
      setPasswordErrors(["Error validating password. Try again."]);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    // 🔍 **Ensure Password Meets Firebase Policy Before Submission**
    if (passwordErrors.length > 0) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/registerV2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error creating account.");
      }

      alert("Account successfully created!");
    } catch (error) {
      setServerError(error.message);
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
            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <Label>Phone Number</Label>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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

            {/* Password (Live Validation) */}
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
                          field.onChange(e); // React Hook Form sync
                          validateLivePassword(e.target.value); // Live Firebase validation
                        }}
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

            {/* Show live password validation errors */}
            {passwordErrors.length > 0 && (
              <Alert variant="destructive">
                <AlertDescription style={{ whiteSpace: "pre-line" }}>
                  {passwordErrors.join("\n")}
                </AlertDescription>
              </Alert>
            )}

            {/* Confirm Password with toggle visibility */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>Confirm Password</Label>
                  <FormControl>
                    <div className="relative">
                      <Input type={showConfirmPassword ? "text" : "password"} {...field} />
                      <button
                        type="button"
                        className="absolute right-3 top-2 text-gray-500"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 🔥 Server Error Display */}
            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={loading} className="w-full cursor-pointer">
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
      By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "} and <a href="#">Privacy Policy</a>.
    </div>
  </div>
  );
}
