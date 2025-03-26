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
  return (
    <Select name={name} defaultValue={value ?? ""}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Shift" />
      </SelectTrigger>
      <SelectContent>
        {shifts.map((shift) => (
          <SelectItem key={shift.id} value={shift.id}>
            {shift.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}