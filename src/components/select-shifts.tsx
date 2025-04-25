import type { Shifts} from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectShiftsProps {
  shifts: Shifts[];
  name: string;
  value: string;
}

export function SelectShifts({ shifts, name, value }: SelectShiftsProps) {
  const isValidValue = value && value !== "{}";
  return (
    <Select name={name} defaultValue={isValidValue ? value : ""}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Schicht auswählen" />
      </SelectTrigger>
      <SelectContent>
        {shifts.map((shift) => (
          <SelectItem key={shift.id} value={JSON.stringify({ id: shift.id, name: shift.name, details: shift.details })}>
            {shift.name} <span className="text-slate-400 text-xs">{shift.details}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}