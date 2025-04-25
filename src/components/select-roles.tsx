import type { Roles } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectRolesProps {
  roles: Roles[];
  name: string; // Nova prop para o atributo "name"
  value: string;
}

export function SelectRoles({ roles, name, value }: SelectRolesProps) {
  return (
    <Select name={name} defaultValue={value ?? ""}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Rolle auswählen" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.id} value={JSON.stringify({ id: role.id, name: role.name })}>
            {role.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}