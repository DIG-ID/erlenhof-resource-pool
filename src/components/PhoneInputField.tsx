"use client";

import { Controller } from "react-hook-form";
import type { Control, FieldValues } from "react-hook-form";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Label } from "@/components/ui/label";
import { FormItem, FormMessage } from "@/components/ui/form";
import type { RegisterSchema } from "@/lib/schemas/register";

interface PhoneInputFieldProps<T extends FieldValues = RegisterSchema> {
  name: string;
  label: string;
  control: Control<T>;
  defaultCountry?: "PT" | "CH";
}

export function PhoneInputField<T extends FieldValues = any>({
  name,
  label,
  control,
  defaultCountry = "CH",
}: PhoneInputFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) =>
          isValidPhoneNumber(value || "") || "Invalid phone number",
      }}
      render={({ field, fieldState }) => (
        <FormItem>
          <Label>{label}</Label>
          <PhoneInput
            {...field}
            defaultCountry={defaultCountry}
            international
            className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <FormMessage>{fieldState?.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
