import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface LiveOfferDialogProps {
  title: string;
  price: number;
  isOpen: boolean;
  onClose: () => void;
}

export const LiveOfferDialog = ({ title, price, isOpen, onClose }: LiveOfferDialogProps) => {
  const [offerAmount, setOfferAmount] = useState(price);
  const [validUntil, setValidUntil] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours par défaut
  );
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  const handleOffer = () => {
    if (offerAmount <= 0) {
      toast({
        title: "Erreur",
        description: "Le montant de l'offre doit être supérieur à 0",
        variant: "destructive",
      });
      return;
    }

    if (!validUntil) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date de validité",
        variant: "destructive",
      });
      return;
    }

    const offerData = {
      propertyTitle: title,
      amount: offerAmount,
      validUntil: validUntil,
      contact: isAuthenticated
        ? {
            name: `${user?.firstName} ${user?.lastName}`,
            email: user?.email,
          }
        : null,
    };

    console.log("Live offer data:", offerData);

    toast({
      title: "Offre envoyée !",
      description: `Votre offre de ${offerAmount.toLocaleString()} DH pour ${title} est valide jusqu'au ${format(validUntil, 'dd MMMM yyyy', { locale: fr })}.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Faire une offre pour {title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Montant de votre offre (DH)</Label>
            <Input
              id="amount"
              type="number"
              value={offerAmount}
              onChange={(e) => setOfferAmount(Number(e.target.value))}
              className="text-lg"
            />
            <p className="text-sm text-muted-foreground">
              Prix demandé : {price.toLocaleString()} DH
            </p>
          </div>

          <div className="space-y-2">
            <Label>Date de validité de l'offre</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {validUntil ? (
                    format(validUntil, 'dd MMMM yyyy', { locale: fr })
                  ) : (
                    <span>Sélectionner une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={validUntil}
                  onSelect={setValidUntil}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={handleOffer} className="w-full">
            Envoyer l'offre
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};