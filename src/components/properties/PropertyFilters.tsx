import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { SmartSearchBar } from "@/components/search/SmartSearchBar";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";

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
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de bien</label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de bien" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Budget : {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} DH
              </label>
              <Slider
                min={0}
                max={5000000}
                step={100000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Surface : {surfaceRange[0]} - {surfaceRange[1]} m²
              </label>
              <Slider
                min={0}
                max={1000}
                step={10}
                value={surfaceRange}
                onValueChange={setSurfaceRange}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
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
        </div>
      )}
    </div>
  );
};