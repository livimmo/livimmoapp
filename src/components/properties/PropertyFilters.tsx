import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface PropertyFiltersProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  propertyType: string;
  setPropertyType: Dispatch<SetStateAction<string>>;
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  surfaceRange: number[];
  setSurfaceRange: Dispatch<SetStateAction<number[]>>;
  transactionType: string[];
  setTransactionType: Dispatch<SetStateAction<string[]>>;
  viewType: "grid" | "list";
  setViewType: Dispatch<SetStateAction<"grid" | "list">>;
}

export const PropertyFilters = ({
  searchTerm,
  setSearchTerm,
  propertyType,
  setPropertyType,
  priceRange,
  setPriceRange,
  surfaceRange,
  setSurfaceRange,
  transactionType,
  setTransactionType,
  viewType,
  setViewType
}: PropertyFiltersProps) => {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          value={propertyType}
          onValueChange={setPropertyType}
        >
          <option value="all">Tous les types</option>
          <option value="apartment">Appartement</option>
          <option value="house">Maison</option>
          <option value="land">Terrain</option>
        </Select>

        <div className="flex gap-2">
          <Button
            variant={viewType === "grid" ? "default" : "outline"}
            onClick={() => setViewType("grid")}
          >
            Grille
          </Button>
          <Button
            variant={viewType === "list" ? "default" : "outline"}
            onClick={() => setViewType("list")}
          >
            Liste
          </Button>
        </div>
      </div>
    </div>
  );
};