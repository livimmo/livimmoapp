import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  return (
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
  );
};