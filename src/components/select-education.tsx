import type { Education } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectEducationProps {
  education: Education[];
  name: string;
  value: string;
}

export function SelectEducation({ education, name, value }: SelectEducationProps) {
  const isValidValue = value && value !== "{}";

  return (
    <Select name={name} defaultValue={isValidValue ? value : ""}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Bereich auswählen" />
      </SelectTrigger>
      <SelectContent>
        {education.map((edu) => (
          <SelectItem key={edu.id} value={JSON.stringify({ id: edu.id, name: edu.name })}>
            {edu.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
