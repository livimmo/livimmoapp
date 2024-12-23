import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { Home, MapPin, Banknote, Square, Video, Calendar, Eye, EyeOff } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <div className="relative">
              <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="title"
                placeholder="Titre du bien"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description détaillée du bien"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">Prix</Label>
            <div className="relative">
              <Banknote className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="price"
                placeholder="Prix"
                value={price}
                onChange={(e) => onPriceChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="surface">Surface</Label>
            <div className="relative">
              <Square className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="surface"
                placeholder="Surface en m²"
                value={surface}
                onChange={(e) => onSurfaceChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="propertyType">Type de bien</Label>
          <Select value={propertyType} onValueChange={onPropertyTypeChange}>
            <SelectTrigger id="propertyType">
              <SelectValue placeholder="Sélectionnez le type de bien" />
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

        <div className="space-y-2">
          <Label>Statut</Label>
          <RadioGroup
            value={status}
            onValueChange={onStatusChange}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="available" id="available" />
              <Label htmlFor="available" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Disponible
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hidden" id="hidden" />
              <Label htmlFor="hidden" className="flex items-center gap-2">
                <EyeOff className="h-4 w-4" />
                Caché
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Type de visite</Label>
          <RadioGroup
            value={visitType}
            onValueChange={onVisitTypeChange}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="live" id="live" />
              <Label htmlFor="live" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Live
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="scheduled" id="scheduled" />
              <Label htmlFor="scheduled" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Visite programmée
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="virtual" id="virtual" />
              <Label htmlFor="virtual" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Visite virtuelle
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};