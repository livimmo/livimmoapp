import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";

interface ConsentStepProps {
  form: UseFormReturn<any>;
}

export const ConsentStep = ({ form }: ConsentStepProps) => {
  const { watch, setValue } = form;
  const [isChecked, setIsChecked] = useState(watch("consent"));

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    setValue("consent", checked);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-3">
        <Checkbox
          id="consent"
          checked={isChecked}
          onCheckedChange={handleChange}
        />
        <Label htmlFor="consent" className="text-sm leading-relaxed">
          J'accepte les conditions générales d'utilisation et autorise l'agence Livimmo à commercialiser mon bien. Je comprends que mon bien sera soumis à validation avant d'être publié sur la plateforme.
        </Label>
      </div>
    </div>
  );
};
