import type { Pools } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectPoolsProps {
  pools: Pools[];
  name: string;
  value: string;
}

export function SelectPools({ pools, name, value }: SelectPoolsProps) {
  return (
    <Select name={name} defaultValue={value ?? ""}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Pool" />
      </SelectTrigger>
      <SelectContent>
        {pools.map((pool) => (
          <SelectItem key={pool.id} value={pool.id}>
            {pool.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}