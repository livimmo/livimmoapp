import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, CheckSquare, XSquare, AlertOctagon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface OfferCardProps {
  offer: any;
  onAccept: (offerId: string) => void;
  onReject: (offerId: string) => void;
  onModify: (offerId: string) => void;
  onContact: (offerId: string) => void;
}

export const OfferCard = ({ 
  offer, 
  onAccept, 
  onReject, 
  onModify, 
  onContact 
}: OfferCardProps) => {
  const { user } = useAuth();
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

  const handleScheduleVisit = () => {
    navigate(`/properties/${offer.id}/visit`);
  };

  return (
    <Card className="p-4 mb-4">
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
                {offer.buyerName} - {new Date(offer.date).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {offer.agent} - {new Date(offer.date).toLocaleDateString()}
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
            <Button size="sm" variant="outline" onClick={() => onAccept(offer.id)}>
              Accepter
            </Button>
            <Button size="sm" variant="outline" onClick={() => onReject(offer.id)}>
              Refuser
            </Button>
            <Button size="sm" variant="outline" onClick={() => onModify(offer.id)}>
              Modifier
            </Button>
          </>
        ) : (
          <>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onContact(offer.id)} 
              className="flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Contacter {isAgent ? "l'acheteur" : "l'agent"}
            </Button>
            {!isAgent && (
              <>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onModify(offer.id)}
                >
                  Modifier l'offre
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleScheduleVisit} 
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Planifier une visite
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </Card>
  );
};