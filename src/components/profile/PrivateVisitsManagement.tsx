import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Visit } from "@/types/visit";
import { VisitsList } from "./visits/VisitsList";
import { VisitCancellationDialog } from "./visits/VisitCancellationDialog";
import { VisitReschedulingDialog } from "./visits/VisitReschedulingDialog";
import { mockVisits } from "@/data/mockVisits";

export const PrivateVisitsManagement = () => {
  const { toast } = useToast();
  const [visits, setVisits] = useState<Visit[]>(mockVisits);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [showCancellationDialog, setShowCancellationDialog] = useState(false);
  const [showReschedulingDialog, setShowReschedulingDialog] = useState(false);

  const handleCancel = (visit: Visit) => {
    setSelectedVisit(visit);
    setShowCancellationDialog(true);
  };

  const handleReschedule = (visit: Visit) => {
    setSelectedVisit(visit);
    setShowReschedulingDialog(true);
  };

  const confirmCancellation = (reason: string) => {
    if (!selectedVisit) return;

    setVisits(visits.map(v =>
      v.id === selectedVisit.id ? { ...v, status: "cancelled" as const } : v
    ));

    toast({
      title: "Visite annulée",
      description: "La visite a été annulée avec succès.",
    });

    setShowCancellationDialog(false);
    setSelectedVisit(null);
  };

  const confirmRescheduling = (newDate: Date, newTime: string) => {
    if (!selectedVisit) return;

    setVisits(visits.map(v =>
      v.id === selectedVisit.id
        ? { ...v, date: newDate, time: newTime, status: "pending" as const }
        : v
    ));

    toast({
      title: "Visite reprogrammée",
      description: "La nouvelle date a été enregistrée avec succès.",
    });

    setShowReschedulingDialog(false);
    setSelectedVisit(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Mes Visites Privées</h2>

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
            onCancel={handleCancel}
            onReschedule={handleReschedule}
          />
        </TabsContent>

        <TabsContent value="confirmed">
          <VisitsList
            visits={visits}
            status="confirmed"
            onCancel={handleCancel}
            onReschedule={handleReschedule}
          />
        </TabsContent>

        <TabsContent value="ongoing">
          <VisitsList
            visits={visits}
            status="ongoing"
            onCancel={handleCancel}
            onReschedule={handleReschedule}
          />
        </TabsContent>

        <TabsContent value="completed">
          <VisitsList
            visits={visits}
            status="completed"
            onCancel={handleCancel}
            onReschedule={handleReschedule}
          />
        </TabsContent>

        <TabsContent value="cancelled">
          <VisitsList
            visits={visits}
            status="cancelled"
            onCancel={handleCancel}
            onReschedule={handleReschedule}
          />
        </TabsContent>
      </Tabs>

      {selectedVisit && (
        <>
          <VisitCancellationDialog
            open={showCancellationDialog}
            onOpenChange={setShowCancellationDialog}
            onConfirm={confirmCancellation}
            visitTitle={selectedVisit.propertyTitle}
          />
          <VisitReschedulingDialog
            open={showReschedulingDialog}
            onOpenChange={setShowReschedulingDialog}
            onConfirm={confirmRescheduling}
            visitTitle={selectedVisit.propertyTitle}
            currentDate={selectedVisit.date}
            currentTime={selectedVisit.time}
          />
        </>
      )}
    </div>
  );
};