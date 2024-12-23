import { useState } from "react";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface PropertyNotesProps {
  property: Property;
  onSave: (notes: string) => void;
}

export const PropertyNotes = ({ property, onSave }: PropertyNotesProps) => {
  const [notes, setNotes] = useState(property.privateNotes || "");
  const { toast } = useToast();

  const handleSave = () => {
    onSave(notes);
    toast({
      title: "Notes sauvegardées",
      description: "Les notes privées ont été mises à jour avec succès.",
    });
  };

  return (
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
  );
};