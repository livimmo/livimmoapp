import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisitsList } from "./VisitsList";
import { VisitDetailsDialog } from "./VisitDetailsDialog";
import { useState } from "react";
import { Visit } from "@/types/visit";
import { mockVisits } from "@/data/mockVisits";
import { useToast } from "@/hooks/use-toast";

export const PrivateVisitsSection = () => {
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [visits] = useState<Visit[]>(mockVisits);
  const { toast } = useToast();

  const handleCancel = (visit: Visit) => {
    toast({
      title: "Visite annulée",
      description: "La visite a été annulée avec succès.",
    });
  };

  const handleReschedule = (visit: Visit) => {
    toast({
      title: "Visite reprogrammée",
      description: "La visite a été reprogrammée avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Mes Visites Privées</h2>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmées</TabsTrigger>
          <TabsTrigger value="ongoing">En cours</TabsTrigger>
          <TabsTrigger value="completed">Terminées</TabsTrigger>
          <TabsTrigger value="cancelled">Annulées</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <VisitsList 
            visits={visits}
            status="pending"
            onVisitSelect={setSelectedVisit}
            onCancel={handleCancel}
            onReschedule={handleReschedule}
          />
        </TabsContent>
        <TabsContent value="confirmed">
          <VisitsList 
            visits={visits}
            status="confirmed"
            onVisitSelect={setSelectedVisit}
            onCancel={handleCancel}
            onReschedule={handleReschedule}
          />
        </TabsContent>
        <TabsContent value="ongoing">
          <VisitsList 
            visits={visits}
            status="ongoing"
            onVisitSelect={setSelectedVisit}
            onCancel={handleCancel}
            onReschedule={handleReschedule}
          />
        </TabsContent>
        <TabsContent value="completed">
          <VisitsList 
            visits={visits}
            status="completed"
            onVisitSelect={setSelectedVisit}
            onCancel={handleCancel}
            onReschedule={handleReschedule}
          />
        </TabsContent>
        <TabsContent value="cancelled">
          <VisitsList 
            visits={visits}
            status="cancelled"
            onVisitSelect={setSelectedVisit}
            onCancel={handleCancel}
            onReschedule={handleReschedule}
          />
        </TabsContent>
      </Tabs>

      {selectedVisit && (
        <VisitDetailsDialog
          visit={selectedVisit}
          onClose={() => setSelectedVisit(null)}
        />
      )}
    </div>
  );
};