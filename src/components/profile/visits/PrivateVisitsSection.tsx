import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisitsList } from "./VisitsList";
import { VisitDetailsDialog } from "./VisitDetailsDialog";
import { useState } from "react";
import { Visit } from "@/types/visit";

export const PrivateVisitsSection = () => {
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

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
            status="pending"
            onVisitSelect={setSelectedVisit}
          />
        </TabsContent>
        <TabsContent value="confirmed">
          <VisitsList 
            status="confirmed"
            onVisitSelect={setSelectedVisit}
          />
        </TabsContent>
        <TabsContent value="ongoing">
          <VisitsList 
            status="ongoing"
            onVisitSelect={setSelectedVisit}
          />
        </TabsContent>
        <TabsContent value="completed">
          <VisitsList 
            status="completed"
            onVisitSelect={setSelectedVisit}
          />
        </TabsContent>
        <TabsContent value="cancelled">
          <VisitsList 
            status="cancelled"
            onVisitSelect={setSelectedVisit}
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