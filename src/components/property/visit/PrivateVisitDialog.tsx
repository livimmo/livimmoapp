import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { type Property } from "@/types/property";

interface PrivateVisitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialProperty?: Property;
}

export function PrivateVisitDialog({ isOpen, onClose, initialProperty }: PrivateVisitDialogProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const handleConfirm = () => {
    toast({
      title: "Visite privée confirmée",
      description: "Votre demande de visite privée a été envoyée avec succès.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Planifier une visite privée</DialogTitle>
          <DialogDescription>
            Choisissez une date pour visiter {initialProperty?.title || "ce bien"}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={fr}
            disabled={(date) => date < new Date()}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleConfirm}
            disabled={!date}
          >
            {date
              ? `Confirmer pour le ${format(date, "d MMMM yyyy", {
                  locale: fr,
                })}`
              : "Sélectionnez une date"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}