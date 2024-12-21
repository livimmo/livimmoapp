import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fr } from "date-fns/locale";

interface AvailabilityStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const AvailabilityStep = ({ data, onUpdate }: AvailabilityStepProps) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Type de visite préféré*</Label>
        <RadioGroup
          value={formData.visitType || "live"}
          onValueChange={(value) => handleChange("visitType", value)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="live" id="live" />
            <Label htmlFor="live">Live en direct</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="scheduled" id="scheduled" />
            <Label htmlFor="scheduled">Live programmé</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="replay" id="replay" />
            <Label htmlFor="replay">Replay</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="virtual" id="virtual" />
            <Label htmlFor="virtual">Visite virtuelle</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Dates de disponibilité préférées</Label>
        <Calendar
          mode="multiple"
          selected={formData.availableDates || []}
          onSelect={(dates) => handleChange("availableDates", dates)}
          className="rounded-md border"
          locale={fr}
        />
      </div>
    </div>
  );
};