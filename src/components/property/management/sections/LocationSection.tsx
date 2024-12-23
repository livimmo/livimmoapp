import { Label } from "@/components/ui/label";
import { GoogleMapInput } from "@/components/GoogleMapInput";

interface LocationSectionProps {
  location: string;
  onLocationChange: (location: string) => void;
}

export const LocationSection = ({ location, onLocationChange }: LocationSectionProps) => {
  return (
    <div className="space-y-2">
      <Label>Localisation*</Label>
      <GoogleMapInput
        value={location}
        onChange={onLocationChange}
        required
      />
    </div>
  );
};