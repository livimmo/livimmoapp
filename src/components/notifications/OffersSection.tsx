import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, CheckSquare, XSquare, AlertOctagon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

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

// Données mockées pour la démonstration
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
  const isAgent = user?.role === "agent" || user?.role === "promoter";

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertOctagon className="h-5 w-5 text-yellow-500" />;
      case "accepted":
        return <CheckSquare className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XSquare className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "accepted":
        return "Acceptée";
      case "rejected":
        return "Refusée";
      default:
        return status;
    }
  };

  const renderOffer = (offer: Offer) => (
    <Card key={offer.id} className="p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{offer.propertyTitle}</h3>
          <p className="text-sm text-muted-foreground">{offer.address}</p>
          <div className="mt-2">
            <p className="font-medium">
              {offer.amount.toLocaleString()} MAD
            </p>
            <p className="text-sm text-muted-foreground">
              {isAgent ? `Acheteur: ${offer.buyer}` : `Agent: ${offer.agent}`} - {offer.date.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            {getStatusIcon(offer.status)}
            <span className="text-sm font-medium">
              {getStatusText(offer.status)}
            </span>
          </div>
        </div>
      </div>
      {isAgent && offer.status === "pending" && (
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline" className="flex-1">
            Accepter
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Refuser
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Modifier
          </Button>
        </div>
      )}
      {!isAgent && offer.status === "accepted" && (
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline" className="flex-1">
            Contacter l'agent
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Planifier une visite
          </Button>
        </div>
      )}
    </Card>
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
    </div>
  );
};