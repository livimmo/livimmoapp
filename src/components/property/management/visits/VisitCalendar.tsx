import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Visit } from "@/types/visit";
import { VisitDetailsDialog } from "./VisitDetailsDialog";
import { AddAvailabilityDialog } from "./AddAvailabilityDialog";
import { Button } from "@/components/ui/button";
import { ViewType, CalendarViewSelector } from "./CalendarViewSelector";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface VisitCalendarProps {
  propertyId: number;
  propertyTitle: string;
}

export const VisitCalendar = ({ propertyId, propertyTitle }: VisitCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [viewType, setViewType] = useState<ViewType>("month");
  const [showVisitDetails, setShowVisitDetails] = useState(false);
  const [showAddAvailability, setShowAddAvailability] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  const getVisitsForDate = (date: Date) => {
    // TODO: Implement API call to get visits
    return [];
  };

  const getVisitStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Calendrier des visites - {propertyTitle}</h3>
        <div className="flex gap-2">
          <CalendarViewSelector value={viewType} onValueChange={setViewType} />
          <Button onClick={() => setShowAddAvailability(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une disponibilité
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-lg border"
          locale={fr}
          modifiers={{
            hasVisits: (date) => getVisitsForDate(date).length > 0,
          }}
          modifiersStyles={{
            hasVisits: {
              backgroundColor: "#f3f4f6",
              fontWeight: "bold"
            }
          }}
          components={{
            DayContent: ({ date }) => {
              const visits = getVisitsForDate(date);
              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  {date.getDate()}
                  {visits.length > 0 && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                      {visits.map((visit, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full ${getVisitStatusColor(visit.status)}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            },
          }}
        />
      </Card>

      {selectedVisit && (
        <VisitDetailsDialog
          visit={selectedVisit}
          open={showVisitDetails}
          onOpenChange={setShowVisitDetails}
        />
      )}

      <AddAvailabilityDialog
        propertyId={propertyId}
        open={showAddAvailability}
        onOpenChange={setShowAddAvailability}
      />
    </div>
  );
};