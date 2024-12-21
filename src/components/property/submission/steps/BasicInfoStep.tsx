import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";

interface BasicInfoStepProps {
  form: UseFormReturn<any>;
}

export const BasicInfoStep = ({ form }: BasicInfoStepProps) => {
  const { register, watch, setValue } = form;
  const formData = watch("basicInfo");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre du bien*</Label>
        <Input
          id="title"
          placeholder="Ex: Appartement 3 pièces au centre-ville"
          {...register("basicInfo.title")}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description détaillée*</Label>
        <Textarea
          id="description"
          placeholder="Décrivez votre bien en détail..."
          {...register("basicInfo.description")}
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
            {...register("basicInfo.price")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type de bien*</Label>
          <Select
            {...register("basicInfo.type")}
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
            {...register("basicInfo.location")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="surface">Surface (m²)*</Label>
          <Input
            id="surface"
            type="number"
            placeholder="Surface en m²"
            {...register("basicInfo.surface")}
            required
          />
        </div>
      </div>
    </div>
  );
};
