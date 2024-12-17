import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { SmartSearchBar } from "@/components/search/SmartSearchBar";
import { TransactionTypeFilter } from "./filters/TransactionTypeFilter";
import { LiveOnlyFilter } from "./filters/LiveOnlyFilter";
import { PriceRangeFilter } from "./filters/PriceRangeFilter";
import { SurfaceRangeFilter } from "./filters/SurfaceRangeFilter";

interface PropertyFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  surfaceRange: number[];
  setSurfaceRange: (value: number[]) => void;
  viewType: "all" | "live" | "replay";
  setViewType: (value: "all" | "live" | "replay") => void;
  suggestions?: string[];
  transactionType: string[];
  setTransactionType: (value: string[]) => void;
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
  viewType,
  setViewType,
  suggestions = [],
  transactionType,
  setTransactionType,
}: PropertyFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SmartSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            suggestions={suggestions}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {showFilters && (
        <div className="space-y-4">
          <TransactionTypeFilter
            transactionType={transactionType}
            setTransactionType={setTransactionType}
          />

          <div className="flex items-center gap-4">
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type de bien" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Appartement">Appartement</SelectItem>
                <SelectItem value="Bureau">Bureau</SelectItem>
                <SelectItem value="Riad">Riad</SelectItem>
                <SelectItem value="Hôtel">Hôtel</SelectItem>
                <SelectItem value="Commerce">Commerce</SelectItem>
                <SelectItem value="Industriel">Industriel</SelectItem>
                <SelectItem value="Terrain">Terrain</SelectItem>
              </SelectContent>
            </Select>
            <LiveOnlyFilter 
              viewType={viewType}
              setViewType={setViewType}
            />
          </div>

          <PriceRangeFilter 
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          <SurfaceRangeFilter 
            surfaceRange={surfaceRange}
            setSurfaceRange={setSurfaceRange}
          />
        </div>
      )}
    </div>
  );
};