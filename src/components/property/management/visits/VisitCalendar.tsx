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
import { Badge } from "@/components/ui/badge";

interface VisitCalendarProps {
  propertyId: number;
  propertyTitle: string;
}

// Données d'exemple pour les visites
const mockVisits: Visit[] = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Appartement Moderne",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Casablanca",
    date: new Date("2024-03-25T10:00:00"),
    time: "10:00",
    status: "confirmed",
    type: "physical",
    agent: {
      id: 1,
      name: "Sarah Martin",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      contact: {
        phone: "+212 6XX XXX XXX",
        email: "sarah.martin@example.com"
      },
      location: "Casablanca",
      type: "agent",
      rating: 4.8,
      totalReviews: 124,
      activeProperties: 15,
      completedLives: 45,
      scheduledLives: 3,
      soldProperties: 89,
      company: "Livimmo",
      verified: true,
      specialties: ["Résidentiel", "Luxe"],
      description: "Expert immobilier"
    },
    visitor: {
      name: "Mohammed Alami",
      email: "m.alami@example.com",
      phone: "+212 6XX XXX XXX"
    }
  },
  {
    id: 2,
    propertyId: 1,
    propertyTitle: "Appartement Moderne",
    propertyImage: "/placeholder.svg",
    propertyLocation: "Casablanca",
    date: new Date("2024-03-25T14:30:00"),
    time: "14:30",
    status: "pending",
    type: "virtual",
    agent: {
      id: 1,
      name: "Sarah Martin",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      contact: {
        phone: "+212 6XX XXX XXX",
        email: "sarah.martin@example.com"
      },
      location: "Casablanca",
      type: "agent",
      rating: 4.8,
      totalReviews: 124,
      activeProperties: 15,
      completedLives: 45,
      scheduledLives: 3,
      soldProperties: 89,
      company: "Livimmo",
      verified: true,
      specialties: ["Résidentiel", "Luxe"],
      description: "Expert immobilier"
    },
    visitor: {
      name: "Sophia Chen",
      email: "s.chen@example.com",
      phone: "+212 6XX XXX XXX"
    }
  }
];

export const VisitCalendar = ({ propertyId, propertyTitle }: VisitCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewType, setViewType] = useState<ViewType>("month");
  const [showVisitDetails, setShowVisitDetails] = useState(false);
  const [showAddAvailability, setShowAddAvailability] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  const getVisitsForDate = (date: Date) => {
    return mockVisits.filter(
      (visit) => visit.date.toDateString() === date.toDateString()
    );
  };

  const getVisitCount = (date: Date) => {
    return getVisitsForDate(date).length;
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

      <div className="grid md:grid-cols-[300px,1fr] gap-4">
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
          />
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-4">
            {selectedDate ? (
              `Visites du ${format(selectedDate, "d MMMM yyyy", { locale: fr })}`
            ) : (
              "Sélectionnez une date"
            )}
          </h4>
          <div className="space-y-4">
            {selectedDate &&
              getVisitsForDate(selectedDate).map((visit) => (
                <Card key={visit.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                  setSelectedVisit(visit);
                  setShowVisitDetails(true);
                }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={visit.status === "confirmed" ? "default" : "secondary"}>
                          {visit.status === "confirmed" ? "Confirmée" : "En attente"}
                        </Badge>
                        <Badge variant="outline">
                          {visit.type === "physical" ? "Visite physique" : "Visite virtuelle"}
                        </Badge>
                      </div>
                      <p className="font-medium mt-2">{visit.time}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Visiteur: {visit.visitor.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Contact: {visit.visitor.phone}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            {selectedDate && getVisitsForDate(selectedDate).length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Aucune visite prévue pour cette date
              </p>
            )}
          </div>
        </Card>
      </div>

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