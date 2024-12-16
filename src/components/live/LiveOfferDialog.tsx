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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Euro, Video, House } from "lucide-react";
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
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [visitType, setVisitType] = useState("physical");
  const [visitDate, setVisitDate] = useState<Date>();
  const [visitTime, setVisitTime] = useState("");
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

  const handleVisit = () => {
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
      contact: isAuthenticated
        ? {
            name: `${user?.firstName} ${user?.lastName}`,
            email: user?.email,
          }
        : null,
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

          <TabsContent value="offer" className="space-y-4">
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
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={validUntil}
                    onSelect={setValidUntil}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="bg-white rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button onClick={handleOffer} className="w-full">
              <Euro className="w-4 h-4 mr-2" />
              Envoyer l'offre
            </Button>
          </TabsContent>

          <TabsContent value="visit" className="space-y-4">
            <div className="space-y-2">
              <Label>Type de visite</Label>
              <Select value={visitType} onValueChange={setVisitType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">
                    <div className="flex items-center">
                      <House className="w-4 h-4 mr-2" />
                      Visite physique
                    </div>
                  </SelectItem>
                  <SelectItem value="virtual">
                    <div className="flex items-center">
                      <Video className="w-4 h-4 mr-2" />
                      Visite virtuelle
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date de la visite</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {visitDate ? (
                      format(visitDate, 'dd MMMM yyyy', { locale: fr })
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={visitDate}
                    onSelect={setVisitDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="bg-white rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Heure de la visite</Label>
              <Input
                type="time"
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
              />
            </div>

            <Button onClick={handleVisit} className="w-full">
              {visitType === 'physical' ? (
                <House className="w-4 h-4 mr-2" />
              ) : (
                <Video className="w-4 h-4 mr-2" />
              )}
              Réserver la visite
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};