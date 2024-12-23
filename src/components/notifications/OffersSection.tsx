import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, CheckSquare, XSquare, AlertOctagon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { OfferCard } from "./offers/OfferCard";
import { EditOfferDialog } from "./offers/EditOfferDialog";
import { useToast } from "@/hooks/use-toast";

// Types pour les offres
interface Offer {
  id: string;
  propertyTitle: string;
  amount: number;
  date: Date;
  status: "pending" | "accepted" | "rejected";
  agent: string;
  buyer?: string;
  address: string;
}

const mockAgentOffers: Offer[] = [
  {
    id: "1",
    propertyTitle: "Appartement Luxe - Maarif",
    amount: 2500000,
    date: new Date(),
    status: "pending",
    buyer: "John Doe",
    agent: "Agent Youssef",
    address: "Rue des Fleurs, Maarif, Casablanca"
  },
  {
    id: "2",
    propertyTitle: "Villa Moderne - Californie",
    amount: 5000000,
    date: new Date(Date.now() - 86400000),
    status: "accepted",
    buyer: "Jane Smith",
    agent: "Agent Sarah",
    address: "Boulevard Principal, Californie, Casablanca"
  }
];

const mockBuyerOffers: Offer[] = [
  {
    id: "3",
    propertyTitle: "Appartement Vue Mer - Ain Diab",
    amount: 3500000,
    date: new Date(),
    status: "accepted",
    agent: "Agent Mohammed",
    address: "Corniche, Ain Diab, Casablanca"
  },
  {
    id: "4",
    propertyTitle: "Duplex Moderne - Gauthier",
    amount: 4200000,
    date: new Date(Date.now() - 172800000),
    status: "rejected",
    agent: "Agent Sophia",
    address: "Rue Mozart, Gauthier, Casablanca"
  }
];

export const OffersSection = () => {
  const [activeTab, setActiveTab] = useState("received");
  const { user } = useAuth();
  const { toast } = useToast();
  const isAgent = user?.role === "agent" || user?.role === "promoter";
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAcceptOffer = (offer: Offer) => {
    // Logique pour accepter l'offre
    toast({
      title: "Offre acceptée",
      description: "L'offre a été acceptée avec succès.",
    });
  };

  const handleRejectOffer = (offer: Offer) => {
    // Logique pour refuser l'offre
    toast({
      title: "Offre refusée",
      description: "L'offre a été refusée.",
    });
  };

  const handleModifyOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsEditDialogOpen(true);
  };

  const handleContactAgent = (offer: Offer) => {
    // Logique pour contacter l'agent
    toast({
      title: "Contact agent",
      description: "La demande de contact a été envoyée.",
    });
  };

  const handleScheduleVisit = (offer: Offer) => {
    // Logique pour planifier une visite
    toast({
      title: "Visite planifiée",
      description: "La demande de visite a été envoyée.",
    });
  };

  const handleUpdateOffer = (updatedOffer: Offer) => {
    // Logique pour mettre à jour l'offre
    console.log("Offre mise à jour:", updatedOffer);
  };

  const renderOffer = (offer: Offer) => (
    <OfferCard
      key={offer.id}
      offer={offer}
      isAgent={isAgent}
      onAccept={() => handleAcceptOffer(offer)}
      onReject={() => handleRejectOffer(offer)}
      onModify={() => handleModifyOffer(offer)}
      onContact={() => handleContactAgent(offer)}
      onScheduleVisit={() => handleScheduleVisit(offer)}
    />
  );

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          {isAgent ? (
            <>
              <TabsTrigger value="received" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Reçues
              </TabsTrigger>
              <TabsTrigger value="accepted" className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Acceptées
              </TabsTrigger>
              <TabsTrigger value="archived" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Archivées
              </TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger value="accepted" className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Acceptées
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <AlertOctagon className="h-4 w-4" />
                En attente
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center gap-2">
                <XSquare className="h-4 w-4" />
                Refusées
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <ScrollArea className="h-[calc(100vh-300px)] mt-4">
          {isAgent ? (
            <>
              <TabsContent value="received">
                {mockAgentOffers.filter(o => o.status === "pending").map(renderOffer)}
              </TabsContent>
              <TabsContent value="accepted">
                {mockAgentOffers.filter(o => o.status === "accepted").map(renderOffer)}
              </TabsContent>
              <TabsContent value="archived">
                <div className="text-center py-8 text-muted-foreground">
                  Aucune offre archivée
                </div>
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="accepted">
                {mockBuyerOffers.filter(o => o.status === "accepted").map(renderOffer)}
              </TabsContent>
              <TabsContent value="pending">
                {mockBuyerOffers.filter(o => o.status === "pending").map(renderOffer)}
              </TabsContent>
              <TabsContent value="rejected">
                {mockBuyerOffers.filter(o => o.status === "rejected").map(renderOffer)}
              </TabsContent>
            </>
          )}
        </ScrollArea>
      </Tabs>

      {selectedOffer && (
        <EditOfferDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          offer={selectedOffer}
          onSubmit={handleUpdateOffer}
        />
      )}
    </div>
  );
};
