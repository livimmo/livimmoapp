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
import { Input } from "@/components/ui/input";

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
  const [manualPrice, setManualPrice] = useState(false);
  const [manualSurface, setManualSurface] = useState(false);

  const handlePriceChange = (value: number[]) => {
    if (value[1] >= 10000000) {
      setManualPrice(true);
    }
    setPriceRange(value);
  };

  const handleSurfaceChange = (value: number[]) => {
    if (value[1] >= 10000) {
      setManualSurface(true);
    }
    setSurfaceRange(value);
  };

  const handleManualPriceChange = (index: number, value: string) => {
    const newValue = parseInt(value) || 0;
    const newRange = [...priceRange];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };

  const handleManualSurfaceChange = (index: number, value: string) => {
    const newValue = parseInt(value) || 0;
    const newRange = [...surfaceRange];
    newRange[index] = newValue;
    setSurfaceRange(newRange);
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
            <label className="text-sm font-medium">Prix (DH)</label>
            {manualPrice ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handleManualPriceChange(0, e.target.value)}
                  className="w-32"
                  placeholder="Min"
                />
                <span>-</span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handleManualPriceChange(1, e.target.value)}
                  className="w-32"
                  placeholder="Max"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setManualPrice(false)}
                >
                  Utiliser le curseur
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0].toLocaleString()} DH</span>
                  <span>{priceRange[1].toLocaleString()} DH</span>
                </div>
                <Slider
                  min={0}
                  max={10000000}
                  step={100000}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Surface (m²)</label>
            {manualSurface ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={surfaceRange[0]}
                  onChange={(e) => handleManualSurfaceChange(0, e.target.value)}
                  className="w-32"
                  placeholder="Min"
                />
                <span>-</span>
                <Input
                  type="number"
                  value={surfaceRange[1]}
                  onChange={(e) => handleManualSurfaceChange(1, e.target.value)}
                  className="w-32"
                  placeholder="Max"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setManualSurface(false)}
                >
                  Utiliser le curseur
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{surfaceRange[0]} m²</span>
                  <span>{surfaceRange[1]} m²</span>
                </div>
                <Slider
                  min={0}
                  max={10000}
                  step={10}
                  value={surfaceRange}
                  onValueChange={handleSurfaceChange}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};