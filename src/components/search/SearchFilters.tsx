import { Input } from "@/components/ui/input";
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
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";

interface SearchFiltersProps {
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
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
}

export const SearchFilters = ({
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
  showFilters,
  setShowFilters,
}: SearchFiltersProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 p-4 space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher par ville ou région..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
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
        <div className="space-y-4 pt-2">
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
              </SelectContent>
            </Select>
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

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Prix : {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} MAD
            </label>
            <Slider
              min={0}
              max={5000000}
              step={100000}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Surface : {surfaceRange[0]} - {surfaceRange[1]} m²
            </label>
            <Slider
              min={0}
              max={500}
              step={10}
              value={surfaceRange}
              onValueChange={setSurfaceRange}
            />
          </div>
        </div>
      )}
    </div>
  );
};