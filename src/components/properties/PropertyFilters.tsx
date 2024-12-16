import { type Property } from "@/types/property";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export interface PropertyFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  surfaceRange: [number, number];
  setSurfaceRange: (value: [number, number]) => void;
  showLiveOnly: boolean;
  setShowLiveOnly: (value: boolean) => void;
  suggestions?: string[];
  transactionType: "Vente" | "Location";
  setTransactionType: (value: "Vente" | "Location") => void;
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, suggestions]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const propertyTypes = [
    "all",
    "Appartement",
    "Villa",
    "Riad",
    "Bureau",
    "Commerce",
    "Terrain",
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search Input */}
        <div className="relative">
          <Label>Rechercher</Label>
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ville, quartier, type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-1">
              <ScrollArea className="bg-white rounded-md border shadow-lg max-h-[200px]">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Property Type */}
        <div>
          <Label>Type de bien</Label>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <Badge
                key={type}
                variant={propertyType === type ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setPropertyType(type)}
              >
                {type === "all" ? "Tous" : type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Transaction Type */}
        <div>
          <Label>Type de transaction</Label>
          <div className="flex gap-2">
            <Badge
              variant={transactionType === "Vente" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setTransactionType("Vente")}
            >
              Vente
            </Badge>
            <Badge
              variant={transactionType === "Location" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setTransactionType("Location")}
            >
              Location
            </Badge>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <Label>Prix (DH)</Label>
          <Slider
            defaultValue={priceRange}
            min={0}
            max={5000000}
            step={100000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mt-2"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>{priceRange[0].toLocaleString()} DH</span>
            <span>{priceRange[1].toLocaleString()} DH</span>
          </div>
        </div>

        {/* Surface Range */}
        <div>
          <Label>Surface (m²)</Label>
          <Slider
            defaultValue={surfaceRange}
            min={0}
            max={1000}
            step={10}
            value={surfaceRange}
            onValueChange={(value) => setSurfaceRange(value as [number, number])}
            className="mt-2"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>{surfaceRange[0]} m²</span>
            <span>{surfaceRange[1]} m²</span>
          </div>
        </div>

        {/* Live Only Switch */}
        <div className="flex items-center space-x-2">
          <Switch
            id="live-mode"
            checked={showLiveOnly}
            onCheckedChange={setShowLiveOnly}
          />
          <Label htmlFor="live-mode">Visites live uniquement</Label>
        </div>
      </div>
    </div>
  );
};