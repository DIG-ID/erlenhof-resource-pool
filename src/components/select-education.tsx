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
  return (
    <Select name={name} defaultValue={value ?? ""}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Eduaction" />
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