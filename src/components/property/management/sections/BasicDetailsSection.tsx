import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

      <div className="space-y-2">
        <Label>Statut du bien*</Label>
        <Select value={status} onValueChange={onStatusChange} required>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner le statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>Disponible</span>
              </div>
            </SelectItem>
            <SelectItem value="hidden">
              <div className="flex items-center gap-2">
                <EyeOff className="h-4 w-4" />
                <span>Caché</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Type de visite*</Label>
        <RadioGroup value={visitType} onValueChange={onVisitTypeChange} className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 rounded-lg border p-4">
            <RadioGroupItem value="live" id="live" />
            <Label htmlFor="live" className="flex items-center gap-2">
              <Video className="h-4 w-4 text-red-500" />
              Live
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border p-4">
            <RadioGroupItem value="scheduled" id="scheduled" />
            <Label htmlFor="scheduled" className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              Visite programmée
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border p-4">
            <RadioGroupItem value="virtual" id="virtual" />
            <Label htmlFor="virtual" className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-purple-500" />
              Visite virtuelle
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border p-4">
            <RadioGroupItem value="replay" id="replay" />
            <Label htmlFor="replay" className="flex items-center gap-2">
              <Video className="h-4 w-4 text-emerald-500" />
              Replay
            </Label>
          </div>
        </RadioGroup>
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