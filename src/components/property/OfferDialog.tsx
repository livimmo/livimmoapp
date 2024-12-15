import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface OfferDialogProps {
  title: string;
  price: number;
}

export const OfferDialog = ({ title, price }: OfferDialogProps) => {
  const [offerAmount, setOfferAmount] = useState(price);
  const { toast } = useToast();

  const handleOffer = () => {
    toast({
      title: "Offre envoyée !",
      description: `Votre offre de ${offerAmount.toLocaleString()} DH pour ${title} a été envoyée.`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Faire une offre</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Faire une offre pour {title}</DialogTitle>
          <DialogDescription>
            Prix demandé : {price.toLocaleString()} DH
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="text-sm font-medium">
              Montant de votre offre (DH)
            </label>
            <Input
              id="amount"
              type="number"
              value={offerAmount}
              onChange={(e) => setOfferAmount(Number(e.target.value))}
              className="mt-1"
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