import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";

interface BasicDetailsSectionProps {
  title: string;
  description: string;
  price: string;
  surface: string;
  rooms: string;
  propertyType: string;
  transactionType: "Vente" | "Location";
  features: string[];
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onSurfaceChange: (value: string) => void;
  onRoomsChange: (value: string) => void;
  onPropertyTypeChange: (value: string) => void;
  onTransactionTypeChange: (value: "Vente" | "Location") => void;
  onFeaturesChange: (value: string[]) => void;
}

export const BasicDetailsSection = ({
  title,
  description,
  price,
  surface,
  rooms,
  propertyType,
  transactionType,
  features,
  onTitleChange,
  onDescriptionChange,
  onPriceChange,
  onSurfaceChange,
  onRoomsChange,
  onPropertyTypeChange,
  onTransactionTypeChange,
  onFeaturesChange,
}: BasicDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Titre*</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Ex: Appartement moderne avec vue sur mer"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description*</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Description détaillée du bien..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="transactionType">Type de transaction*</Label>
          <Select value={transactionType} onValueChange={onTransactionTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Vente">Vente</SelectItem>
              <SelectItem value="Location">Location</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="price">Prix (MAD)*</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            placeholder="Prix en MAD"
            required
          />
        </div>

        <div>
          <Label htmlFor="surface">Surface (m²)*</Label>
          <Input
            id="surface"
            type="number"
            value={surface}
            onChange={(e) => onSurfaceChange(e.target.value)}
            placeholder="Surface en m²"
            required
          />
        </div>

        <div>
          <Label htmlFor="rooms">Nombre de pièces*</Label>
          <Select value={rooms} onValueChange={onRoomsChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1} {i === 0 ? "pièce" : "pièces"}
                </SelectItem>
              ))}
              <SelectItem value="10+">10+ pièces</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="propertyType">Type de bien*</Label>
          <Select value={propertyType} onValueChange={onPropertyTypeChange}>
            <SelectTrigger>
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
    </div>
  );
};