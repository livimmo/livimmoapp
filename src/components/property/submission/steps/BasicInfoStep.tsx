import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";

interface BasicInfoStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const BasicInfoStep = ({ data, onUpdate }: BasicInfoStepProps) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre du bien*</Label>
        <Input
          id="title"
          placeholder="Ex: Appartement 3 pièces au centre-ville"
          value={formData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description détaillée*</Label>
        <Textarea
          id="description"
          placeholder="Décrivez votre bien en détail..."
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Prix (MAD)*</Label>
          <Input
            id="price"
            type="number"
            placeholder="Prix en MAD"
            value={formData.price || ""}
            onChange={(e) => handleChange("price", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type de bien*</Label>
          <Select
            value={formData.type || ""}
            onValueChange={(value) => handleChange("type", value)}
          >
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

        <div className="space-y-2">
          <Label htmlFor="location">Localisation*</Label>
          <Input
            id="location"
            placeholder="Ville, Quartier"
            value={formData.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="surface">Surface (m²)*</Label>
          <Input
            id="surface"
            type="number"
            placeholder="Surface en m²"
            value={formData.surface || ""}
            onChange={(e) => handleChange("surface", e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};