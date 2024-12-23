import { Property } from "@/types/property";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface PropertyNotesProps {
  property: Property;
  onSave: (notes: Property['privateNotes']) => void;
}

export const PropertyNotes = ({ property, onSave }: PropertyNotesProps) => {
  const [notes, setNotes] = useState<Property['privateNotes']>(property.privateNotes || {
    ownerName: '',
    location: '',
    notes: ''
  });

  const handleSave = () => {
    onSave(notes);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Nom du propriétaire</label>
        <Input
          value={notes?.ownerName || ''}
          onChange={(e) => setNotes(prev => ({ ...prev, ownerName: e.target.value }))}
          placeholder="Nom du propriétaire"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Localisation</label>
        <Input
          value={notes?.location || ''}
          onChange={(e) => setNotes(prev => ({ ...prev, location: e.target.value }))}
          placeholder="Localisation"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Notes privées</label>
        <Textarea
          value={notes?.notes || ''}
          onChange={(e) => setNotes(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Notes privées"
          className="h-32"
        />
      </div>

      <Button onClick={handleSave}>
        Enregistrer les notes
      </Button>
    </div>
  );
};