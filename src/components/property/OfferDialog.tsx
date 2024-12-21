import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Euro, HandCoins, UserPlus2 } from "lucide-react";
import { OfferForm } from "./offer/OfferForm";
import { VisitBookingForm } from "./offer/VisitBookingForm";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface OfferDialogProps {
  title: string;
  price: number;
}

export const OfferDialog = ({ title, price }: OfferDialogProps) => {
  const [offerAmount, setOfferAmount] = useState(price);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [validUntil, setValidUntil] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleOffer = () => {
    if (!isAuthenticated) {
      setIsOpen(false);
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
      message,
      validUntil,
      contact: {
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.email,
        phone,
      },
    };

    console.log("Offer data:", offerData);

    toast({
      title: "Offre envoyée !",
      description: `Votre offre de ${offerAmount.toLocaleString()} DH pour ${title} est valide jusqu'au ${format(validUntil, 'dd MMMM yyyy', { locale: fr })}.`,
    });
    setIsOpen(false);
  };

  const handleVisitBooking = (visitData: any) => {
    if (!isAuthenticated) {
      setIsOpen(false);
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour réserver une visite",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    console.log("Visit booking data:", visitData);
    
    toast({
      title: "Visite réservée !",
      description: `Votre demande de visite pour ${title} a été envoyée. Vous recevrez une confirmation sous peu.`,
    });
    setIsOpen(false);
  };

  const getButtonContent = () => {
    if (!isAuthenticated) {
      return (
        <>
          <UserPlus2 className="w-4 h-4" />
          Faire une offre rapide
        </>
      );
    }
    
    if (price > 1000000) {
      return (
        <>
          <Euro className="w-4 h-4" />
          Proposer un prix
        </>
      );
    }

    return (
      <>
        <HandCoins className="w-4 h-4" />
        Faire une offre
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full" 
          variant={!isAuthenticated ? "secondary" : "default"}
        >
          {getButtonContent()}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Faire une offre pour {title}</DialogTitle>
          <DialogDescription>
            Prix demandé : {price.toLocaleString()} DH
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="offer" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="offer">Faire une offre</TabsTrigger>
            <TabsTrigger value="visit">Réserver une visite</TabsTrigger>
          </TabsList>

          <TabsContent value="offer" className="mt-4">
            <OfferForm
              title={title}
              price={price}
              offerAmount={offerAmount}
              message={message}
              name={name}
              email={email}
              phone={phone}
              validUntil={validUntil}
              isAuthenticated={isAuthenticated}
              onOfferAmountChange={setOfferAmount}
              onMessageChange={setMessage}
              onNameChange={setName}
              onEmailChange={setEmail}
              onPhoneChange={setPhone}
              onValidUntilChange={setValidUntil}
            />
            <Button onClick={handleOffer} className="w-full mt-4">
              Envoyer l'offre
            </Button>
          </TabsContent>

          <TabsContent value="visit" className="mt-4">
            <VisitBookingForm
              name={isAuthenticated ? `${user?.firstName} ${user?.lastName}` : name}
              email={isAuthenticated ? user?.email || "" : email}
              phone={phone}
              onSubmit={handleVisitBooking}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};