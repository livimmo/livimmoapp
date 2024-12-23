import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { CalendarIcon, Upload } from "lucide-react";
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
  const [message, setMessage] = useState(offer.message || "");
  const [status, setStatus] = useState(offer.status);
  const [validUntil, setValidUntil] = useState<Date | undefined>(
    offer.validUntil ? new Date(offer.validUntil) : undefined
  );
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedOffer = {
      ...offer,
      amount,
      message,
      status: isAgent ? status : offer.status,
      validUntil,
      files,
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier l'offre - {offer.propertyTitle}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isAgent && (
            <div className="space-y-2">
              <Label htmlFor="amount">Montant de l'offre (DH)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>
          )}

          {isAgent && (
            <div className="space-y-2">
              <Label>Statut de l'offre</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="accepted">Acceptée</SelectItem>
                  <SelectItem value="rejected">Refusée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {!isAgent && (
            <div className="space-y-2">
              <Label>Date limite de validité</Label>
              <div className="flex flex-col">
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal"
                  type="button"
                  onClick={() => {}}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {validUntil ? (
                    format(validUntil, 'dd MMMM yyyy', { locale: fr })
                  ) : (
                    <span>Sélectionner une date</span>
                  )}
                </Button>
                <Calendar
                  mode="single"
                  selected={validUntil}
                  onSelect={setValidUntil}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border mt-2"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ajoutez un message ou des détails supplémentaires..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Documents justificatifs</Label>
            <div className="border-2 border-dashed rounded-lg p-4">
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Glissez et déposez vos fichiers ici ou
                </p>
                <label className="cursor-pointer">
                  <Input
                    type="file"
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files || []);
                      setFiles(prev => [...prev, ...newFiles]);
                    }}
                    multiple
                    className="hidden"
                  />
                  <Button type="button" variant="outline" size="sm">
                    Parcourir
                  </Button>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};