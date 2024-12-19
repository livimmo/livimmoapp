import { Visit } from "@/types/visit";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface VisitCardProps {
  visit: Visit;
  onSelect: () => void;
}

export const VisitCard = ({ visit, onSelect }: VisitCardProps) => {
  const getStatusBadge = (status: Visit["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">En attente</Badge>;
      case "confirmed":
        return <Badge variant="default">Confirmée</Badge>;
      case "ongoing":
        return <Badge variant="default" className="bg-blue-500">En cours</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-green-500">Terminée</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>;
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img
            src={visit.propertyImage}
            alt={visit.propertyTitle}
            className="w-24 h-24 object-cover rounded"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{visit.propertyTitle}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {visit.propertyLocation}
                </p>
              </div>
              {getStatusBadge(visit.status)}
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(visit.date, "d MMMM yyyy", { locale: fr })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {visit.time}
              </span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <img
                  src={visit.agentImage}
                  alt={visit.agentName}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm">{visit.agentName}</span>
              </div>
              <Button onClick={onSelect} variant="outline" size="sm">
                Voir les détails
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};