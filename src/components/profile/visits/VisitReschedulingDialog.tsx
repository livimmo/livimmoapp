import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { fr } from "date-fns/locale";

interface VisitReschedulingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (date: Date, time: string) => void;
  visitTitle: string;
  currentDate?: Date;
  currentTime?: string;
}

export const VisitReschedulingDialog = ({
  open,
  onOpenChange,
  onConfirm,
  visitTitle,
  currentDate,
  currentTime,
}: VisitReschedulingDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(currentDate);
  const [time, setTime] = useState(currentTime || "");
  const { toast } = useToast();

  const handleConfirm = () => {
    if (!date || !time) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez sélectionner une date et une heure.",
        variant: "destructive",
      });
      return;
    }
    onConfirm(date, time);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reprogrammer la visite</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Reprogrammer la visite pour : {visitTitle}
          </p>
          <div className="space-y-2">
            <Label>Nouvelle date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              locale={fr}
            />
          </div>
          <div className="space-y-2">
            <Label>Nouvelle heure</Label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleConfirm}>
            Confirmer la nouvelle date
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};