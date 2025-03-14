"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxProps {
  isActive: boolean;
  name: string;
}

export const CheckboxReact = ({ isActive, name }: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(isActive);

  return (
    <Checkbox
      id={name}
      name={name}
      checked={checked}
      onCheckedChange={(value) => setChecked(!!value)}
    />
  );
};
