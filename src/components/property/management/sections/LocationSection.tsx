import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GoogleMapInput } from "@/components/GoogleMapInput";

interface LocationSectionProps {
  city: string;
  district: string;
  onCityChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
}

export const LocationSection = ({
  city,
  district,
  onCityChange,
  onDistrictChange,
}: LocationSectionProps) => {
  const handleLocationSelect = (location: string) => {
    // Extraire la ville et le quartier de l'adresse formatée
    const parts = location.split(',');
    if (parts.length >= 2) {
      const cityPart = parts[parts.length - 2].trim();
      onCityChange(cityPart);
      if (parts.length >= 3) {
        const districtPart = parts[parts.length - 3].trim();
        onDistrictChange(districtPart);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="city">Ville*</Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder="Ex: Casablanca"
            required
          />
        </div>

        <div>
          <Label htmlFor="district">Quartier*</Label>
          <Input
            id="district"
            value={district}
            onChange={(e) => onDistrictChange(e.target.value)}
            placeholder="Ex: Gauthier"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Sélectionner sur la carte</Label>
        <div className="h-[300px] w-full">
          <GoogleMapInput
            onLocationSelect={handleLocationSelect}
            value={`${district}, ${city}`}
            required
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Cliquez sur la carte pour sélectionner l'emplacement exact de votre bien
        </p>
      </div>
    </div>
  );
};