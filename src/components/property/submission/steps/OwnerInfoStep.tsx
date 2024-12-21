import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface OwnerInfoStepProps {
  form: UseFormReturn<any>;
}

export const OwnerInfoStep = ({ form }: OwnerInfoStepProps) => {
  const { register } = form;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="ownerName">Nom et prénom*</Label>
        <Input
          id="ownerName"
          placeholder="Votre nom complet"
          {...register("ownerInfo.ownerName")}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ownerEmail">Adresse email*</Label>
        <Input
          id="ownerEmail"
          type="email"
          placeholder="votre@email.com"
          {...register("ownerInfo.ownerEmail")}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ownerPhone">Numéro de téléphone*</Label>
        <Input
          id="ownerPhone"
          type="tel"
          placeholder="+212 6XX XXX XXX"
          {...register("ownerInfo.ownerPhone")}
          required
        />
      </div>
    </div>
  );
};
