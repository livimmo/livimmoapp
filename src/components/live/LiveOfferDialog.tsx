import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { OfferTabContent } from "./offer/OfferTabContent";
import { VisitTabContent } from "./offer/VisitTabContent";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface LiveOfferDialogProps {
  title: string;
  price: number;
  isOpen: boolean;
  onClose: () => void;
}

export const LiveOfferDialog = ({ title, price, isOpen, onClose }: LiveOfferDialogProps) => {
  const [offerAmount, setOfferAmount] = useState(price);
  const [validUntil, setValidUntil] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [visitType, setVisitType] = useState("physical");
  const [visitDate, setVisitDate] = useState<Date>();
  const [visitTime, setVisitTime] = useState("");
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleOffer = () => {
    if (!isAuthenticated) {
      onClose();
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour faire une offre",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

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
      contact: {
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.email,
      },
    };

    console.log("Live offer data:", offerData);

    toast({
      title: "Offre envoyée !",
      description: `Votre offre de ${offerAmount.toLocaleString()} DH pour ${title} est valide jusqu'au ${format(validUntil, 'dd MMMM yyyy', { locale: fr })}.`,
    });
    onClose();
  };

  const handleVisit = () => {
    if (!isAuthenticated) {
      onClose();
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour réserver une visite",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!visitDate || !visitTime) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date et une heure pour la visite",
        variant: "destructive",
      });
      return;
    }

    const visitData = {
      propertyTitle: title,
      type: visitType,
      date: visitDate,
      time: visitTime,
      contact: {
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.email,
      },
    };

    console.log("Visit booking data:", visitData);

    toast({
      title: "Visite réservée !",
      description: `Votre demande de visite ${visitType === 'physical' ? 'physique' : 'virtuelle'} pour ${title} a été enregistrée pour le ${format(visitDate, 'dd MMMM yyyy', { locale: fr })} à ${visitTime}.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Je suis intéressé(e) par {title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="offer" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="offer">Faire une offre</TabsTrigger>
            <TabsTrigger value="visit">Réserver une visite</TabsTrigger>
          </TabsList>

          <TabsContent value="offer">
            <OfferTabContent
              offerAmount={offerAmount}
              validUntil={validUntil}
              price={price}
              onOfferAmountChange={setOfferAmount}
              onValidUntilChange={setValidUntil}
              onSubmit={handleOffer}
            />
          </TabsContent>

          <TabsContent value="visit">
            <VisitTabContent
              visitType={visitType}
              visitDate={visitDate}
              visitTime={visitTime}
              onVisitTypeChange={setVisitType}
              onVisitDateChange={setVisitDate}
              onVisitTimeChange={setVisitTime}
              onSubmit={handleVisit}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};