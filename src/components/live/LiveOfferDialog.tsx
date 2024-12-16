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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";

interface LiveOfferDialogProps {
  title: string;
  price: number;
  isOpen: boolean;
  onClose: () => void;
}

export const LiveOfferDialog = ({ title, price, isOpen, onClose }: LiveOfferDialogProps) => {
  const [offerAmount, setOfferAmount] = useState(price);
  const [validityDays, setValidityDays] = useState("7"); // Default 7 days
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
      validityDays: parseInt(validityDays),
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
      description: `Votre offre de ${offerAmount.toLocaleString()} DH pour ${title} est valable ${validityDays} jours.`,
    });
    onClose();
  };

  const validityOptions = [
    { value: "3", label: "3 jours" },
    { value: "7", label: "7 jours" },
    { value: "14", label: "14 jours" },
    { value: "30", label: "30 jours" },
  ];

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

          <div className="space-y-2">
            <Label htmlFor="validity" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Durée de validité
            </Label>
            <Select value={validityDays} onValueChange={setValidityDays}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une durée" />
              </SelectTrigger>
              <SelectContent>
                {validityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Votre offre expirera automatiquement après cette période si elle n'est pas acceptée.
            </p>
          </div>

          <Button onClick={handleOffer} className="w-full bg-[#ea384c] text-white hover:bg-[#ea384c]/90">
            Envoyer l'offre
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};