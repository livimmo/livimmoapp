import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Property } from "@/types/property";

interface PropertyNotesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Property;
  onSave: (notes: {
    ownerName: string;
    privateLocation: string;
    internalNotes: string;
  }) => void;
}

export const PropertyNotes = ({
  open,
  onOpenChange,
  property,
  onSave,
}: PropertyNotesProps) => {
  const [ownerName, setOwnerName] = useState(property?.privateNotes?.ownerName || "");
  const [privateLocation, setPrivateLocation] = useState(
    property?.privateNotes?.location || ""
  );
  const [internalNotes, setInternalNotes] = useState(
    property?.privateNotes?.notes || ""
  );

  const handleSave = () => {
    onSave({
      ownerName,
      privateLocation,
      internalNotes,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notes privées - {property?.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="ownerName">Nom du propriétaire</Label>
            <Input
              id="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Ex: John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="privateLocation">Localisation privée</Label>
            <Input
              id="privateLocation"
              value={privateLocation}
              onChange={(e) => setPrivateLocation(e.target.value)}
              placeholder="Ex: Entrée par l'arrière du bâtiment"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="internalNotes">Notes internes</Label>
            <Textarea
              id="internalNotes"
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Notes confidentielles..."
              className="h-32"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Enregistrer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};