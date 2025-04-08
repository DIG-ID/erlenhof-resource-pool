import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").trim(),
    surname: z.string().min(2, "Surname must be at least 2 characters").trim(),
    email: z.string().email("Invalid email address").trim(),
    
    phoneNumber: z
    .string()
    .refine((value) => isValidPhoneNumber(value || ""), {
      message: "Invalid phone number",
    })
    .refine((value) => value.startsWith("+"), {
      message: "Phone number must start with country code",
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
