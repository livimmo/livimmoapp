import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ConsentStepProps {
  data: boolean;
  onUpdate: (data: boolean) => void;
}

export const ConsentStep = ({ data, onUpdate }: ConsentStepProps) => {
  const [isChecked, setIsChecked] = useState(data);

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    onUpdate(checked);
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