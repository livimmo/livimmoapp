import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { SmartSearchBar } from "@/components/search/SmartSearchBar";
import { TransactionTypeFilter } from "./filters/TransactionTypeFilter";
import { PriceFilter } from "./filters/PriceFilter";

interface PropertyFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  surfaceRange: number[];
  setSurfaceRange: (value: number[]) => void;
  showLiveOnly: boolean;
  setShowLiveOnly: (value: boolean) => void;
  suggestions?: string[];
  transactionType: string;
  setTransactionType: (value: string) => void;
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
  showLiveOnly,
  setShowLiveOnly,
  suggestions = [],
  transactionType,
  setTransactionType,
}: PropertyFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [manualPrice, setManualPrice] = useState(false);

  const handleManualPriceChange = (index: number, value: string) => {
    const newValue = parseInt(value) || 0;
    const newRange = [...priceRange];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };

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
          <div className="flex items-center gap-4">
            <TransactionTypeFilter
              value={transactionType}
              onChange={setTransactionType}
            />
            <div className="flex items-center gap-2">
              <Checkbox
                id="live"
                checked={showLiveOnly}
                onCheckedChange={(checked) => setShowLiveOnly(checked as boolean)}
              />
              <label htmlFor="live" className="text-sm">
                Live uniquement
              </label>
            </div>
          </div>

          <PriceFilter
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            manualPrice={manualPrice}
            setManualPrice={setManualPrice}
            handleManualPriceChange={handleManualPriceChange}
          />
        </div>
      )}
    </div>
  );
};