import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Filters() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Input placeholder="Search location..." />

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bedrooms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1+</SelectItem>
          <SelectItem value="2">2+</SelectItem>
          <SelectItem value="3">3+</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
