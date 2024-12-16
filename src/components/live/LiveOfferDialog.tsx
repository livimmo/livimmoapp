import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface LiveOfferDialogProps {
  title: string;
  price: number;
  isOpen: boolean;
  onClose: () => void;
}

export const LiveOfferDialog = ({ title, price, isOpen, onClose }: LiveOfferDialogProps) => {
  const [offerAmount, setOfferAmount] = useState(price);
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

    const offerData = {
      propertyTitle: title,
      amount: offerAmount,
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
      description: `Votre offre de ${offerAmount.toLocaleString()} DH pour ${title} a été envoyée.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Proposer un prix pour {title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Montant de votre offre (DH)</Label>
            <Input
              id="amount"
              type="number"
              value={offerAmount}
              onChange={(e) => setOfferAmount(Number(e.target.value))}
              className="text-lg"
            />
          </div>

          <Button onClick={handleOffer} className="w-full">
            Envoyer l'offre
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};