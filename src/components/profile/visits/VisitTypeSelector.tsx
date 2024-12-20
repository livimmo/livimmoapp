import { Video, Home } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type VisitType = "remote" | "physical";

interface VisitTypeSelectorProps {
  onSelect: (type: VisitType) => void;
}

export const VisitTypeSelector = ({ onSelect }: VisitTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card 
        className="p-6 cursor-pointer hover:border-primary transition-colors"
        onClick={() => onSelect("remote")}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <Video className="w-12 h-12 text-primary" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Visite à Distance</h3>
            <p className="text-sm text-muted-foreground">
              Profitez d'une visite live avec un agent depuis chez vous
            </p>
          </div>
          <Button className="w-full">Choisir la visite à distance</Button>
        </div>
      </Card>

      <Card 
        className="p-6 cursor-pointer hover:border-primary transition-colors"
        onClick={() => onSelect("physical")}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <Home className="w-12 h-12 text-primary" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Visite Physique</h3>
            <p className="text-sm text-muted-foreground">
              Visitez le bien en personne avec un agent immobilier
            </p>
          </div>
          <Button className="w-full">Choisir la visite physique</Button>
        </div>
      </Card>
    </div>
  );
};