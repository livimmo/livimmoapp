import { useState } from "react";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PropertyNotesProps {
  property: Property | undefined;
  onSave: (notes: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PropertyNotes = ({ property, onSave, open, onOpenChange }: PropertyNotesProps) => {
  const [notes, setNotes] = useState(property?.privateNotes || "");
  const { toast } = useToast();

  if (!property) return null;

  const handleSave = () => {
    onSave(notes);
    toast({
      title: "Notes sauvegardées",
      description: "Les notes privées ont été mises à jour avec succès.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notes privées</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>Propriété : {property.title}</p>
            <p>Localisation : {property.location}</p>
          </div>

          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ajoutez vos notes privées ici..."
            className="min-h-[200px]"
          />

          <Button onClick={handleSave}>
            Sauvegarder les notes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};