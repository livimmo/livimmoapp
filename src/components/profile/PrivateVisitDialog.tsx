import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type Property } from "@/types/property";

interface PrivateVisitDialogProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

interface VisitFormData {
  date: string;
  time: string;
  notes?: string;
}

export const PrivateVisitDialog = ({ property, isOpen, onClose }: PrivateVisitDialogProps) => {
  const [formData, setFormData] = useState<VisitFormData>({ date: "", time: "", notes: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (data: VisitFormData) => {
    const propertyId = parseInt(property.id, 10);
    const agentId = parseInt(property.agent.id, 10);
    
    // Submit the visit request logic here
    console.log("Submitting visit request for property:", propertyId, "with agent:", agentId, "and data:", data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] animate-in fade-in-0 zoom-in-95">
        <DialogHeader>
          <DialogTitle>Planifier une visite</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(formData); }}>
          <div className="space-y-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes supplémentaires"
              className="w-full p-2 border rounded"
            />
            <Button type="submit" variant="default" className="w-full">Envoyer la demande</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
