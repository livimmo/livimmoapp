import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FavoritesFiltersProps {
  filterType: string;
  onFilterChange: (value: string) => void;
  onSortChange: () => void;
  sortOrder: "asc" | "desc";
}

export const FavoritesFilters = ({
  filterType,
  onFilterChange,
  onSortChange,
  sortOrder,
}: FavoritesFiltersProps) => {
  return (
    <div className="flex gap-4 items-center mb-6">
      <Select value={filterType} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type de bien" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les types</SelectItem>
          <SelectItem value="Villa">Villa</SelectItem>
          <SelectItem value="Appartement">Appartement</SelectItem>
          <SelectItem value="Bureau">Bureau</SelectItem>
          <SelectItem value="Riad">Riad</SelectItem>
          <SelectItem value="Commerce">Commerce</SelectItem>
          <SelectItem value="Studio">Studio</SelectItem>
          <SelectItem value="Loft">Loft</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={onSortChange}>
        <ArrowUpDown className="mr-2 h-4 w-4" />
        Prix {sortOrder === "asc" ? "croissant" : "décroissant"}
      </Button>
    </div>
  );
};