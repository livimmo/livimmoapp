import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface EditOfferDialogProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
  onSubmit: (updatedOffer: any) => void;
}

export const EditOfferDialog = ({ isOpen, onClose, offer, onSubmit }: EditOfferDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAgent = user?.role === "agent" || user?.role === "promoter";

  const [amount, setAmount] = useState(offer.amount);
  const [message, setMessage] = useState("");
  const [validUntil, setValidUntil] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [status, setStatus] = useState(offer.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedOffer = {
      ...offer,
      amount,
      message,
      validUntil,
      status: isAgent ? status : offer.status,
    };

    onSubmit(updatedOffer);
    toast({
      title: "Offre mise à jour",
      description: "Les modifications ont été enregistrées avec succès.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier l'offre</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Bien concerné</Label>
            <p className="text-sm text-muted-foreground">{offer.propertyTitle}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Montant de l'offre (MAD)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              disabled={isAgent && offer.status !== "pending"}
            />
          </div>

          {!isAgent && (
            <div className="space-y-2">
              <Label>Date limite de validité</Label>
              <Calendar
                mode="single"
                selected={validUntil}
                onSelect={setValidUntil}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>
          )}

          {isAgent && (
            <div className="space-y-2">
              <Label htmlFor="status">Statut de l'offre</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="accepted">Acceptée</SelectItem>
                  <SelectItem value="rejected">Refusée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ajoutez un message ou des précisions..."
              className="h-24"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};