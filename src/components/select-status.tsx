// src/components/SelectRole.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface State {
  id: string;
  status: string;
}

interface SelectStateProps {
  status: State[];
  name: string;
}

export function SelectStatus({ status, name }: SelectStateProps) {
  return (
    <Select name={name}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        {status.map((state) => (
          <SelectItem key={state.id} value={state.status}>
            {state.status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}