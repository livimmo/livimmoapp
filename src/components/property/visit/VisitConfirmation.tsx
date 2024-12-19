import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VisitConfirmationProps {
  selectedProperties: Property[];
  selectedDate: Date | undefined;
  selectedTime: string;
  comment: string;
  onCommentChange: (comment: string) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const VisitConfirmation = ({
  selectedProperties,
  selectedDate,
  selectedTime,
  comment,
  onCommentChange,
  onConfirm,
  onBack,
}: VisitConfirmationProps) => {
  if (!selectedDate) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Biens sélectionnés</h3>
        <ScrollArea className="h-[200px] rounded-md border p-4">
          {selectedProperties.map((property) => (
            <div
              key={property.id}
              className="flex items-center gap-4 py-2 border-b last:border-0"
            >
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h4 className="font-medium">{property.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {property.location}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div>
        <h3 className="font-medium mb-2">Date et heure</h3>
        <p>
          {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })} à{" "}
          {selectedTime}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Commentaire (optionnel)</h3>
        <Textarea
          placeholder="Ajoutez des précisions sur votre visite..."
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          className="h-24"
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={onConfirm}>Confirmer la visite</Button>
      </div>
    </div>
  );
};