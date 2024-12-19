import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface PrivateVisitDialogProps {
  propertyTitle: string;
}

export function PrivateVisitDialog({ propertyTitle }: PrivateVisitDialogProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleConfirm = () => {
    toast({
      title: "Visite privée confirmée",
      description: "Votre demande de visite privée a été envoyée avec succès.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Demander une visite privée</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Planifier une visite privée</DialogTitle>
          <DialogDescription>
            Choisissez une date pour visiter {propertyTitle}
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