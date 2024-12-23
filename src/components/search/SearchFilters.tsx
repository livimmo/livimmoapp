import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, SlidersHorizontal } from "lucide-react";
import { SmartSearchBar } from "./SmartSearchBar";
import { TransactionTypeFilter } from "./filters/TransactionTypeFilter";
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

  const neighborhoods = {
    Casablanca: ["Maarif", "Anfa", "Bourgogne", "Gauthier", "Ain Diab"],
    Rabat: ["Agdal", "Hassan", "Les Orangers", "Hay Riad"],
    Marrakech: ["Guéliz", "Hivernage", "Palmeraie", "Médina"],
  };

  const handleGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Localisation réussie",
            description: "Nous affichons les biens à proximité de votre position.",
          });
          // Ici vous pouvez utiliser position.coords.latitude et position.coords.longitude
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={filters.city} onValueChange={onFiltersChange.setCity}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les villes</SelectItem>
                <SelectItem value="Casablanca">Casablanca</SelectItem>
                <SelectItem value="Rabat">Rabat</SelectItem>
                <SelectItem value="Marrakech">Marrakech</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={filters.neighborhood} 
              onValueChange={onFiltersChange.setNeighborhood}
              disabled={!filters.city}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Quartier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les quartiers</SelectItem>
                {filters.city && neighborhoods[filters.city as keyof typeof neighborhoods]?.map((neighborhood) => (
                  <SelectItem key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Select value={filters.propertyType} onValueChange={onFiltersChange.setPropertyType}>
              <SelectTrigger className="w-[180px] bg-white">
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
                checked={filters.showLiveOnly}
                onCheckedChange={(checked) => onFiltersChange.setShowLiveOnly(checked as boolean)}
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