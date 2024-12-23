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
import { Building2, MapPin, SlidersHorizontal } from "lucide-react";
import { SmartSearchBar } from "./SmartSearchBar";
import { Badge } from "../ui/badge";

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
  transactionType: "buy" | "rent";
  setTransactionType: (value: "buy" | "rent") => void;
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
  transactionType,
  setTransactionType,
}: SearchFiltersProps) => {
  const suggestions = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Tanger",
    "Agadir",
    "Fès",
    "Villa",
    "Appartement",
    "Bureau",
    "Riad",
  ];

  return (
    <div className="fixed top-12 left-0 right-0 bg-white shadow-md z-10 p-3 space-y-3">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="flex gap-2">
            <Button
              variant={transactionType === "buy" ? "default" : "outline"}
              onClick={() => setTransactionType("buy")}
              size="sm"
              className="w-24"
            >
              🏠 Achat
            </Button>
            <Button
              variant={transactionType === "rent" ? "default" : "outline"}
              onClick={() => setTransactionType("rent")}
              size="sm"
              className="w-24"
            >
              📅 Location
            </Button>
          </div>
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
          <div className="space-y-4 bg-white p-4 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Ville
                </label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Toutes les villes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    <SelectItem value="Casablanca">Casablanca</SelectItem>
                    <SelectItem value="Rabat">Rabat</SelectItem>
                    <SelectItem value="Marrakech">Marrakech</SelectItem>
                    <SelectItem value="Tanger">Tanger</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Type de bien
                </label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Appartement">Appartement</SelectItem>
                    <SelectItem value="Bureau">Bureau</SelectItem>
                    <SelectItem value="Riad">Riad</SelectItem>
                    <SelectItem value="Commerce">Commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Prix ({transactionType === "rent" ? "DH/mois" : "DH"})
                </label>
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>{priceRange[0].toLocaleString()}</span>
                  <span>{priceRange[1].toLocaleString()}</span>
                </div>
                <Slider
                  min={0}
                  max={transactionType === "rent" ? 50000 : 5000000}
                  step={transactionType === "rent" ? 500 : 100000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Surface (m²)</label>
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>{surfaceRange[0]}</span>
                  <span>{surfaceRange[1]}</span>
                </div>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={surfaceRange}
                  onValueChange={setSurfaceRange}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="live"
                  checked={showLiveOnly}
                  onCheckedChange={(checked) => setShowLiveOnly(checked as boolean)}
                />
                <label htmlFor="live" className="text-sm font-medium">
                  Live uniquement
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                Prix: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} DH
              </Badge>
              <Badge variant="outline">
                Surface: {surfaceRange[0]} - {surfaceRange[1]} m²
              </Badge>
              {showLiveOnly && (
                <Badge variant="default">Live uniquement</Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};