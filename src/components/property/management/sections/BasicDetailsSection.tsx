import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BasicDetailsSectionProps {
  title: string;
  description: string;
  price: string;
  surface: string;
  propertyType: string;
  status: string;
  visitType: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onSurfaceChange: (value: string) => void;
  onPropertyTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onVisitTypeChange: (value: string) => void;
}

export const BasicDetailsSection = ({
  title,
  description,
  price,
  surface,
  propertyType,
  status,
  visitType,
  onTitleChange,
  onDescriptionChange,
  onPriceChange,
  onSurfaceChange,
  onPropertyTypeChange,
  onStatusChange,
  onVisitTypeChange,
}: BasicDetailsSectionProps) => {
  const [showPrice, setShowPrice] = useState(true);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Titre*</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Ex: Appartement moderne au centre-ville"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Décrivez votre bien..."
            className="h-32"
          />
        </div>

        <div className="relative">
          <Label htmlFor="price">Prix*</Label>
          <div className="relative">
            <Input
              id="price"
              type={showPrice ? "text" : "password"}
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
              placeholder="Ex: 500000"
              required
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPrice(!showPrice)}
            >
              {showPrice ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="surface">Surface (m²)*</Label>
          <Input
            id="surface"
            value={surface}
            onChange={(e) => onSurfaceChange(e.target.value)}
            placeholder="Ex: 75"
            required
          />
        </div>

        <div>
          <Label htmlFor="propertyType">Type de bien*</Label>
          <Select value={propertyType} onValueChange={onPropertyTypeChange} required>
            <SelectTrigger id="propertyType">
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Appartement</SelectItem>
              <SelectItem value="house">Maison</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="land">Terrain</SelectItem>
              <SelectItem value="commercial">Local commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status">Statut</Label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Sélectionnez un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="sold">Vendu</SelectItem>
              <SelectItem value="rented">Loué</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="visitType">Type de visite</Label>
          <Select value={visitType} onValueChange={onVisitTypeChange}>
            <SelectTrigger id="visitType">
              <SelectValue placeholder="Sélectionnez un type de visite" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="physical">Physique</SelectItem>
              <SelectItem value="virtual">Virtuelle</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};