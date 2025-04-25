import type { UserData } from "@/lib/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SelectPropertiesProps {
  properties: UserData[];
  name: string;
  value: string;
}

export function SelectProperty({ properties, name, value }: SelectPropertiesProps) {
  return (
    <Select name={name} defaultValue={value ?? ""}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Property Owner" />
      </SelectTrigger>
      <SelectContent>
        {properties.map((user) => (
          <SelectItem
            key={user.id}
            value={JSON.stringify(user.property)}
          >
            {user.property.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
