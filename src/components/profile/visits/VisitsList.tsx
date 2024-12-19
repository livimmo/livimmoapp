import { Visit } from "@/types/visit";
import { VisitCard } from "./VisitCard";
import { mockVisits } from "@/data/mockVisits";

interface VisitsListProps {
  status: Visit["status"];
  onVisitSelect: (visit: Visit) => void;
}

export const VisitsList = ({ status, onVisitSelect }: VisitsListProps) => {
  // Filter visits by status
  const filteredVisits = mockVisits.filter(visit => visit.status === status);

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
    <div className="grid gap-4 mt-4">
      {filteredVisits.map((visit) => (
        <VisitCard
          key={visit.id}
          visit={visit}
          onSelect={() => onVisitSelect(visit)}
        />
      ))}
    </div>
  );
};