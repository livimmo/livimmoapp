import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ReportFormProps {
  propertyId: string;
  propertyTitle: string;
  onClose: () => void;
}

export const ReportForm = ({ propertyId, propertyTitle, onClose }: ReportFormProps) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement API call
    console.log("Report submitted:", { propertyId, reason, details });
    
    toast({
      title: "Signalement envoyé",
      description: "Merci pour votre signalement. Nous allons l'examiner rapidement.",
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>Signaler un problème</DialogTitle>
        <DialogDescription>
          Pour le bien : {propertyTitle}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <RadioGroup value={reason} onValueChange={setReason}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="inappropriate" id="inappropriate" />
            <Label htmlFor="inappropriate">Contenu inapproprié</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="technical" id="technical" />
            <Label htmlFor="technical">Problème technique</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="video" />
            <Label htmlFor="video">Vidéo non conforme</Label>
          </div>
        </RadioGroup>
        
        <Textarea
          placeholder="Détails du problème"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit" variant="destructive">
          Signaler
        </Button>
      </div>
    </form>
  );
};