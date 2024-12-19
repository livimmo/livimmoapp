import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { type Property } from "@/types/property";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface VisitConfirmationProps {
  selectedProperties: Property[];
  selectedDate: Date | undefined;
  selectedTime: string | undefined;
  comment: string;
  setComment: (comment: string) => void;
}

export function VisitConfirmation({
  selectedProperties,
  selectedDate,
  selectedTime,
  comment,
  setComment,
}: VisitConfirmationProps) {
  const getTimeLabel = (time: string) => {
    switch (time) {
      case "morning":
        return "Matin (9h-12h)";
      case "afternoon":
        return "Après-midi (14h-17h)";
      case "evening":
        return "Soir (17h-19h)";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium">Biens sélectionnés</h4>
        <ScrollArea className="h-[200px] rounded-md border p-4">
          <div className="space-y-4">
            {selectedProperties.map((property) => (
              <div key={property.id} className="space-y-1">
                <div className="flex justify-between">
                  <p className="font-medium">{property.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {property.price.toLocaleString()} DH
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{property.location}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Date et heure</h4>
        <div className="rounded-md border p-4">
          <p>
            {selectedDate && format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
          </p>
          <p className="text-muted-foreground">
            {selectedTime && getTimeLabel(selectedTime)}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Commentaire (facultatif)</Label>
        <Textarea
          id="comment"
          placeholder="Ajoutez des précisions sur votre visite..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
    </div>
  );
}