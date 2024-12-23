import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, CheckSquare, XSquare, AlertOctagon, Phone, Calendar } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
    toast({
      title: "Modification de l'offre",
      description: "Vous allez être redirigé vers le formulaire de modification.",
    });
  };

  const handleContactPerson = (offerId: string) => {
    toast({
      title: "Contact",
      description: "La messagerie va s'ouvrir.",
    });
  };

  const handleScheduleVisit = (offerId: string) => {
    navigate(`/properties/${offerId}/visit`);
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
            {isAgent ? (
              <p className="text-sm text-muted-foreground">
                {offer.buyerName} - {offer.date.toLocaleDateString()}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {offer.agent} - {offer.date.toLocaleDateString()}
              </p>
            )}
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
      <div className="flex flex-wrap gap-2 mt-4">
        {isAgent && offer.status === "pending" ? (
          <>
            <Button size="sm" variant="outline" onClick={() => handleAcceptOffer(offer.id)}>
              Accepter
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleRejectOffer(offer.id)}>
              Refuser
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleModifyOffer(offer.id)}>
              Modifier
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="outline" onClick={() => handleContactPerson(offer.id)} className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contacter {isAgent ? "l'acheteur" : "l'agent"}
            </Button>
            {!isAgent && (
              <Button size="sm" variant="outline" onClick={() => handleScheduleVisit(offer.id)} className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Planifier une visite
              </Button>
            )}
          </>
        )}
      </div>
    </Card>
  );

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
            {mockOffers.filter(o => o.status === "pending").map(renderOffer)}
          </TabsContent>

          <TabsContent value="accepted">
            {mockOffers.filter(o => o.status === "accepted").map(renderOffer)}
          </TabsContent>

          <TabsContent value="rejected">
            {mockOffers.filter(o => o.status === "rejected").map(renderOffer)}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};