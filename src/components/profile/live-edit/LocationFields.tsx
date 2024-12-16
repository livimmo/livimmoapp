import { MapPin, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";

interface LocationFieldsProps {
  location: string;
  propertyType: string;
  onLocationChange: (value: string) => void;
  onPropertyTypeChange: (value: string) => void;
}

export const LocationFields = ({
  location,
  propertyType,
  onLocationChange,
  onPropertyTypeChange,
}: LocationFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Localisation*</label>
        <div className="relative">
          <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Adresse du bien"
            required
            className="pl-8"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Type de bien*</label>
        <div className="relative">
          <Home className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Select value={propertyType} onValueChange={onPropertyTypeChange} required>
            <SelectTrigger className="pl-8">
              <SelectValue placeholder="Sélectionner le type" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};