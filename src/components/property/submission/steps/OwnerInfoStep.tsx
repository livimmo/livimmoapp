import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface OwnerInfoStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const OwnerInfoStep = ({ data, onUpdate }: OwnerInfoStepProps) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="ownerName">Nom et prénom*</Label>
        <Input
          id="ownerName"
          placeholder="Votre nom complet"
          value={formData.ownerName || ""}
          onChange={(e) => handleChange("ownerName", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ownerEmail">Adresse email*</Label>
        <Input
          id="ownerEmail"
          type="email"
          placeholder="votre@email.com"
          value={formData.ownerEmail || ""}
          onChange={(e) => handleChange("ownerEmail", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ownerPhone">Numéro de téléphone*</Label>
        <Input
          id="ownerPhone"
          type="tel"
          placeholder="+212 6XX XXX XXX"
          value={formData.ownerPhone || ""}
          onChange={(e) => handleChange("ownerPhone", e.target.value)}
          required
        />
      </div>
    </div>
  );
};