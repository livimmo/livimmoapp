import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, SlidersHorizontal } from "lucide-react";
import { SmartSearchBar } from "./SmartSearchBar";
import { TransactionTypeFilter } from "./filters/TransactionTypeFilter";
import { PropertyTypeFilter } from "./filters/PropertyTypeFilter";
import { CityNeighborhoodFilter } from "./filters/CityNeighborhoodFilter";
import { type SearchFilters } from "@/types/search";
import { useToast } from "@/hooks/use-toast";

interface SearchFiltersProps {
  filters: SearchFilters;
  showFilters: boolean;
  onFiltersChange: {
    setSearchTerm: (value: string) => void;
    setPropertyType: (value: string) => void;
    setPriceRange: (value: number[]) => void;
    setSurfaceRange: (value: number[]) => void;
    setShowLiveOnly: (value: boolean) => void;
    setTransactionType: (value: string) => void;
    setCity: (value: string) => void;
    setNeighborhood: (value: string) => void;
  };
  setShowFilters: (value: boolean) => void;
}

export const SearchFilters = ({
  filters,
  showFilters,
  onFiltersChange,
  setShowFilters,
}: SearchFiltersProps) => {
  const { toast } = useToast();
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

  const handleGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Localisation réussie",
            description: "Nous affichons les biens à proximité de votre position.",
          });
        },
        () => {
          toast({
            variant: "destructive",
            title: "Erreur de localisation",
            description: "Impossible d'accéder à votre position. Veuillez vérifier vos paramètres.",
          });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Géolocalisation non supportée",
        description: "Votre navigateur ne supporte pas la géolocalisation.",
      });
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SmartSearchBar
            searchTerm={filters.searchTerm}
            setSearchTerm={onFiltersChange.setSearchTerm}
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
        <Button
          variant="outline"
          size="icon"
          onClick={handleGeolocation}
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>

      {showFilters && (
        <div className="space-y-3">
          <TransactionTypeFilter
            value={filters.transactionType}
            onChange={onFiltersChange.setTransactionType}
          />

          <CityNeighborhoodFilter
            city={filters.city}
            neighborhood={filters.neighborhood}
            setCity={onFiltersChange.setCity}
            setNeighborhood={onFiltersChange.setNeighborhood}
          />

          <div className="flex items-center gap-4">
            <PropertyTypeFilter 
              value={filters.propertyType}
              onChange={onFiltersChange.setPropertyType}
            />
            <div className="flex items-center gap-2">
              <Checkbox
                id="live"
                checked={filters.showLiveOnly}
                onCheckedChange={(checked) => 
                  onFiltersChange.setShowLiveOnly(checked as boolean)
                }
              />
              <label htmlFor="live" className="text-sm">
                Live uniquement
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Prix : {filters.priceRange[0].toLocaleString()} - {filters.priceRange[1].toLocaleString()} MAD
            </label>
            <Slider
              min={0}
              max={5000000}
              step={100000}
              value={filters.priceRange}
              onValueChange={onFiltersChange.setPriceRange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Surface : {filters.surfaceRange[0]} - {filters.surfaceRange[1]} m²
            </label>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={filters.surfaceRange}
              onValueChange={onFiltersChange.setSurfaceRange}
            />
          </div>
        </div>
      )}
    </div>
  );
};