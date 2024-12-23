import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, XSquare, AlertOctagon } from "lucide-react";

interface OfferCardProps {
  offer: any;
  isAgent: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onModify?: () => void;
  onContact?: () => void;
  onScheduleVisit?: () => void;
}

export const OfferCard = ({
  offer,
  isAgent,
  onAccept,
  onReject,
  onModify,
  onContact,
  onScheduleVisit,
}: OfferCardProps) => {
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
          <Button size="sm" variant="outline" className="flex-1" onClick={onAccept}>
            Accepter
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={onReject}>
            Refuser
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={onModify}>
            Modifier
          </Button>
        </div>
      )}
      
      {!isAgent && offer.status === "accepted" && (
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline" className="flex-1" onClick={onContact}>
            Contacter l'agent
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={onScheduleVisit}>
            Planifier une visite
          </Button>
        </div>
      )}
    </Card>
  );
};