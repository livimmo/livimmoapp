import { Visit } from "@/types/visit";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface VisitCardProps {
  visit: Visit;
  onCancel: () => void;
  onReschedule: () => void;
  onSelect: () => void;
}

export const VisitCard = ({ visit, onCancel, onReschedule, onSelect }: VisitCardProps) => {
  const getStatusBadge = (status: string) => {
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
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4" onClick={onSelect}>
      <div className="flex items-start gap-4">
        <img
          src={visit.propertyImage}
          alt={visit.propertyTitle}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold">{visit.propertyTitle}</h3>
            {getStatusBadge(visit.status)}
          </div>
          
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {format(new Date(visit.date), "EEEE d MMMM yyyy", { locale: fr })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{visit.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{visit.agent.name}</span>
            </div>
          </div>

          {visit.status === "pending" || visit.status === "confirmed" ? (
            <div className="mt-4 flex gap-2">
              {visit.status === "confirmed" && visit.isLive && (
                <Button variant="default" className="w-full" onClick={() => window.location.href = visit.liveUrl || ''}>
                  Rejoindre le live
                </Button>
              )}
              <Button variant="outline" className="w-full" onClick={onReschedule}>
                Reprogrammer
              </Button>
              <Button variant="destructive" className="w-full" onClick={onCancel}>
                Annuler
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};