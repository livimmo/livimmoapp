import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { Home, MapPin, Banknote, Square } from "lucide-react";

interface BasicInfoFieldsProps {
  title: string;
  description: string;
  price: string;
  surface: string;
  propertyType: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onSurfaceChange: (value: string) => void;
  onPropertyTypeChange: (value: string) => void;
}

export const BasicInfoFields = ({
  title,
  description,
  price,
  surface,
  propertyType,
  onTitleChange,
  onDescriptionChange,
  onPriceChange,
  onSurfaceChange,
  onPropertyTypeChange,
}: BasicInfoFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre*</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Ex: Villa contemporaine à Marrakech"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyType">Type de bien*</Label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Prix*</Label>
          <div className="relative">
            <Banknote className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
              placeholder="Prix en MAD"
              required
              className="pl-8"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="surface">Surface*</Label>
          <div className="relative">
            <Square className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="surface"
              type="number"
              value={surface}
              onChange={(e) => onSurfaceChange(e.target.value)}
              placeholder="Surface en m²"
              required
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Description détaillée du bien"
        />
      </div>
    </div>
  );
};