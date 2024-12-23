import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PropertyStatus = "available" | "pending" | "sold" | "rented";

interface PropertyStatusSelectProps {
  value: PropertyStatus;
  onValueChange: (value: PropertyStatus) => void;
}

export const PropertyStatusSelect = ({
  value,
  onValueChange,
}: PropertyStatusSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="available">Disponible</SelectItem>
        <SelectItem value="pending">En cours</SelectItem>
        <SelectItem value="sold">Vendu</SelectItem>
        <SelectItem value="rented">Loué</SelectItem>
      </SelectContent>
    </Select>
  );
};