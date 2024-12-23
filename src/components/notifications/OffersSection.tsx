import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, CheckSquare, XSquare, AlertOctagon } from "lucide-react";
import { useState } from "react";

// Types temporaires pour la démonstration
interface Offer {
  id: string;
  propertyTitle: string;
  amount: number;
  date: Date;
  status: "pending" | "accepted" | "rejected";
  agent: string;
  address: string;
}

const mockOffers: Offer[] = [
  {
    id: "1",
    propertyTitle: "Appartement Luxe - Maarif",
    amount: 2500000,
    date: new Date(),
    status: "pending",
    agent: "Agent Youssef",
    address: "Rue des Fleurs, Maarif, Casablanca"
  },
  {
    id: "2",
    propertyTitle: "Villa Moderne - Californie",
    amount: 5000000,
    date: new Date(Date.now() - 86400000),
    status: "accepted",
    agent: "Agent Sarah",
    address: "Boulevard Principal, Californie, Casablanca"
  }
];

export const OffersSection = () => {
  const [activeTab, setActiveTab] = useState("received");

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
              {offer.agent} - {offer.date.toLocaleDateString()}
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
      {offer.status === "pending" && (
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
    </Card>
  );

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="received" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Reçues
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Envoyées
          </TabsTrigger>
          <TabsTrigger value="archived" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Archivées
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-300px)] mt-4">
          <TabsContent value="received">
            {mockOffers.map(renderOffer)}
          </TabsContent>

          <TabsContent value="sent">
            <div className="text-center py-8 text-muted-foreground">
              Aucune offre envoyée
            </div>
          </TabsContent>

          <TabsContent value="archived">
            <div className="text-center py-8 text-muted-foreground">
              Aucune offre archivée
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};