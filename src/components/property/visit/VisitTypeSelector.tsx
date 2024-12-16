import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck } from "lucide-react";

interface VisitTypeSelectorProps {
  selectedType: "standard" | "premium";
  onTypeChange: (type: "standard" | "premium") => void;
}

export const VisitTypeSelector = ({
  selectedType,
  onTypeChange,
}: VisitTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <RadioGroup
        value={selectedType}
        onValueChange={(value) => onTypeChange(value as "standard" | "premium")}
        className="grid gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="standard" id="standard" />
          <Label
            htmlFor="standard"
            className="flex items-center justify-between w-full p-4 border rounded-lg cursor-pointer hover:bg-accent"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="font-medium">Visite standard</span>
                <Badge variant="secondary">Gratuit</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Visite en groupe aux horaires prédéfinis
              </p>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="premium" id="premium" />
          <Label
            htmlFor="premium"
            className="flex items-center justify-between w-full p-4 border rounded-lg cursor-pointer hover:bg-accent"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                <span className="font-medium">Visite personnalisée</span>
                <Badge variant="default" className="bg-primary">
                  500 MAD
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Visite privée avec un agent dédié, horaires flexibles
              </p>
            </div>
          </Label>
        </div>
      </RadioGroup>

      {selectedType === "premium" && (
        <div className="p-4 bg-primary/5 rounded-lg space-y-2">
          <h4 className="font-medium">Avantages de la visite personnalisée :</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Choix flexible des horaires</li>
            <li>• Agent immobilier dédié</li>
            <li>• Visite approfondie du bien</li>
            <li>• Questions et réponses personnalisées</li>
            <li>• Annulation gratuite jusqu'à 24h avant</li>
          </ul>
        </div>
      )}
    </div>
  );
};