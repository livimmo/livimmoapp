import { Visit } from "@/types/visit";
import { VisitCard } from "./VisitCard";

export interface VisitsListProps {
  visits: Visit[];
  status: string;
  onCancel: (visit: Visit) => void;
  onReschedule: (visit: Visit) => void;
}

export const VisitsList = ({ visits, status, onCancel, onReschedule }: VisitsListProps) => {
  const filteredVisits = visits.filter(visit => visit.status === status);

  if (filteredVisits.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucune visite {status === "pending" ? "en attente" : 
                      status === "confirmed" ? "confirmée" : 
                      status === "ongoing" ? "en cours" : 
                      status === "completed" ? "terminée" : "annulée"}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredVisits.map((visit) => (
        <VisitCard
          key={visit.id}
          visit={visit}
          onCancel={() => onCancel(visit)}
          onReschedule={() => onReschedule(visit)}
        />
      ))}
    </div>
  );
};