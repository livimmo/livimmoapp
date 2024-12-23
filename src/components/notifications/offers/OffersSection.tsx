import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, CheckSquare, XSquare } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { OfferCard } from "./OfferCard";
import { EditOfferDialog } from "./EditOfferDialog";

// Types pour les offres
interface Offer {
  id: string;
  propertyTitle: string;
  amount: number;
  date: Date;
  status: "pending" | "accepted" | "rejected";
  agent: string;
  address: string;
  buyerName?: string;
}

// Données de démonstration
const mockOffers: Offer[] = [
  {
    id: "1",
    propertyTitle: "Appartement Luxe - Maarif",
    amount: 2500000,
    date: new Date(),
    status: "pending",
    agent: "Agent Youssef",
    address: "Rue des Fleurs, Maarif, Casablanca",
    buyerName: "Mohammed Alami"
  },
  {
    id: "2",
    propertyTitle: "Villa Moderne - Californie",
    amount: 5000000,
    date: new Date(Date.now() - 86400000),
    status: "accepted",
    agent: "Agent Sarah",
    address: "Boulevard Principal, Californie, Casablanca",
    buyerName: "Karim Bennani"
  }
];

export const OffersSection = () => {
  const [activeTab, setActiveTab] = useState("received");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isAgent = user?.role === "agent" || user?.role === "promoter";

  const handleAcceptOffer = (offerId: string) => {
    toast({
      title: "Offre acceptée",
      description: "L'offre a été acceptée avec succès.",
    });
  };

  const handleRejectOffer = (offerId: string) => {
    toast({
      title: "Offre refusée",
      description: "L'offre a été refusée.",
    });
  };

  const handleModifyOffer = (offerId: string) => {
    const offer = mockOffers.find(o => o.id === offerId);
    if (offer) {
      setSelectedOffer(offer);
      setIsEditDialogOpen(true);
    }
  };

  const handleContactPerson = (offerId: string) => {
    toast({
      title: "Contact",
      description: "La messagerie va s'ouvrir.",
    });
  };

  const handleUpdateOffer = (updatedOffer: Offer) => {
    // Ici, nous simulons la mise à jour de l'offre
    toast({
      title: "Offre mise à jour",
      description: "L'offre a été modifiée avec succès.",
    });
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="received" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            {isAgent ? "Reçues" : "En cours"}
          </TabsTrigger>
          <TabsTrigger value="accepted" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Acceptées
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XSquare className="h-4 w-4" />
            Refusées
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-300px)] mt-4">
          <TabsContent value="received">
            {mockOffers
              .filter(o => o.status === "pending")
              .map(offer => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onAccept={handleAcceptOffer}
                  onReject={handleRejectOffer}
                  onModify={handleModifyOffer}
                  onContact={handleContactPerson}
                />
              ))}
          </TabsContent>

          <TabsContent value="accepted">
            {mockOffers
              .filter(o => o.status === "accepted")
              .map(offer => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onAccept={handleAcceptOffer}
                  onReject={handleRejectOffer}
                  onModify={handleModifyOffer}
                  onContact={handleContactPerson}
                />
              ))}
          </TabsContent>

          <TabsContent value="rejected">
            {mockOffers
              .filter(o => o.status === "rejected")
              .map(offer => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onAccept={handleAcceptOffer}
                  onReject={handleRejectOffer}
                  onModify={handleModifyOffer}
                  onContact={handleContactPerson}
                />
              ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>

      {selectedOffer && (
        <EditOfferDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedOffer(null);
          }}
          offer={selectedOffer}
          onSubmit={handleUpdateOffer}
        />
      )}
    </div>
  );
};
