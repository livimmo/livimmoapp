import { Visit } from "@/types/visit";
import { VisitCard } from "./VisitCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { mockVisits } from "@/data/mockVisits";

interface VisitsListProps {
  status: Visit["status"];
  onVisitSelect: (visit: Visit | null) => void;
}

export const VisitsList = ({ status, onVisitSelect }: VisitsListProps) => {
  const [visits] = useState<Visit[]>(mockVisits);
  const filteredVisits = visits.filter(visit => visit.status === status);

  if (filteredVisits.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucune visite à afficher
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-4">
        {filteredVisits.map((visit) => (
          <VisitCard
            key={visit.id}
            visit={visit}
            onSelect={() => onVisitSelect(visit)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};