import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Der Name muss aus mindestens 2 Zeichen bestehen").trim(),
    surname: z.string().min(2, "Nachname muss aus mindestens 2 Zeichen bestehen").trim(),
    email: z.string().email("Ungültige E-Mail Adresse").trim(),
    
    phoneNumber: z
    .string()
    .refine((value) => isValidPhoneNumber(value || ""), {
      message: "Ungültige Rufnummer",
    })
    .refine((value) => value.startsWith("+"), {
      message: "Telefonnummer muss mit der Landesvorwahl beginnen",
    }),
    password: z.string().min(6, "Das Passwort muss mindestens 6 Zeichen lang sein."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwörter stimmen nicht überein",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
