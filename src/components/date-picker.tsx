import * as React from "react";
import { Input } from "@/components/ui/input";

interface DatePickerProps {
  name: string;
  defaultValue?: string; // Aceita um valor inicial no formato ISO (YYYY-MM-DDTHH:mm)
}

export function DatePicker({ name, defaultValue }: DatePickerProps) {
  // Converte a data inicial para o formato correto
  const [date, setDate] = React.useState<string>(defaultValue || "");

  return (
    <>
      <Input
        type="date"
        name={name}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded-md w-full"
        placeholder="Select date & time"
      />
    </>
  );
}

