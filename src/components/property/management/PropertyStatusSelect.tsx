import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type PropertyStatus } from "@/types/property";

interface PropertyStatusSelectProps {
  status: PropertyStatus;
  onStatusChange: (status: PropertyStatus) => void;
}

export const PropertyStatusSelect = ({
  status,
  onStatusChange,
}: PropertyStatusSelectProps) => {
  return (
    <Select value={status} onValueChange={onStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sélectionner un statut" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="available">Disponible</SelectItem>
        <SelectItem value="pending">Sous offre</SelectItem>
        <SelectItem value="sold">Vendu</SelectItem>
        <SelectItem value="rented">Loué</SelectItem>
        <SelectItem value="en_cours">En cours</SelectItem>
      </SelectContent>
    </Select>
  );
};