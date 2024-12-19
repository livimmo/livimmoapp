import { Visit } from "@/types/visit";
import { VisitCard } from "./VisitCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VisitsListProps {
  visits: Visit[];
  onCancel: (visit: Visit) => void;
  onReschedule: (visit: Visit) => void;
}

export const VisitsList = ({ visits, onCancel, onReschedule }: VisitsListProps) => {
  if (visits.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucune visite à afficher
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-4">
        {visits.map((visit) => (
          <VisitCard
            key={visit.id}
            visit={visit}
            onCancel={() => onCancel(visit)}
            onReschedule={() => onReschedule(visit)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};