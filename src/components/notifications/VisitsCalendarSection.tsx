import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, List } from "lucide-react";
import { Visit } from "@/types/visit";
import { VisitCard } from "../profile/visits/VisitCard";
import { VisitDetailsDialog } from "../profile/visits/VisitDetailsDialog";
import { VisitCancellationDialog } from "../profile/visits/VisitCancellationDialog";
import { VisitReschedulingDialog } from "../profile/visits/VisitReschedulingDialog";
import { useToast } from "@/hooks/use-toast";
import { mockVisits } from "@/data/mockVisits";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type ViewMode = "calendar" | "list";
type VisitType = "all" | "scheduled" | "private";

export const VisitsCalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [visitType, setVisitType] = useState<VisitType>("all");
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [showCancellationDialog, setShowCancellationDialog] = useState(false);
  const [showReschedulingDialog, setShowReschedulingDialog] = useState(false);
  const { toast } = useToast();

  // Utilisation des données mockées pour l'exemple
  const visits = mockVisits;

  const filteredVisits = visits.filter(visit => {
    if (visitType === "all") return true;
    if (visitType === "scheduled") return visit.type === "physical";
    return visit.type === "virtual";
  });

  const visitsForSelectedDate = selectedDate 
    ? filteredVisits.filter(visit => 
        visit.date.toDateString() === selectedDate.toDateString()
      )
    : [];

  const handleCancel = (visit: Visit) => {
    setSelectedVisit(visit);
    setShowCancellationDialog(true);
  };

  const handleReschedule = (visit: Visit) => {
    setSelectedVisit(visit);
    setShowReschedulingDialog(true);
  };

  const confirmCancellation = (reason: string) => {
    toast({
      title: "Visite annulée",
      description: "La visite a été annulée avec succès.",
    });
    setShowCancellationDialog(false);
    setSelectedVisit(null);
  };

  const confirmRescheduling = (newDate: Date, newTime: string) => {
    toast({
      title: "Visite reprogrammée",
      description: "La visite a été reprogrammée avec succès.",
    });
    setShowReschedulingDialog(false);
    setSelectedVisit(null);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Calendrier des Visites</h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("calendar")}
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendrier
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-2" />
            Liste
          </Button>
        </div>
      </div>

      <Tabs value={visitType} onValueChange={(value) => setVisitType(value as VisitType)}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">
            Toutes
            <Badge variant="secondary" className="ml-2">
              {filteredVisits.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            Programmées
            <Badge variant="secondary" className="ml-2">
              {visits.filter(v => v.type === "physical").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="private">
            Privées
            <Badge variant="secondary" className="ml-2">
              {visits.filter(v => v.type === "virtual").length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={visitType}>
          <div className="grid md:grid-cols-[300px,1fr] gap-4">
            {viewMode === "calendar" && (
              <Card className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={fr}
                  className="rounded-md"
                />
              </Card>
            )}

            <Card className="p-4">
              <h3 className="font-medium mb-4">
                {selectedDate ? (
                  `Visites du ${format(selectedDate, "d MMMM yyyy", { locale: fr })}`
                ) : (
                  "Sélectionnez une date"
                )}
              </h3>
              <div className="space-y-4">
                {visitsForSelectedDate.length > 0 ? (
                  visitsForSelectedDate.map((visit) => (
                    <VisitCard
                      key={visit.id}
                      visit={visit}
                      onCancel={() => handleCancel(visit)}
                      onReschedule={() => handleReschedule(visit)}
                      onSelect={() => setSelectedVisit(visit)}
                    />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Aucune visite prévue pour cette date
                  </p>
                )}
              </div>
            </Card>
          </div>
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
          <VisitDetailsDialog
            visit={selectedVisit}
            onClose={() => setSelectedVisit(null)}
          />
        </>
      )}
    </Card>
  );
};