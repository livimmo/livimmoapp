import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Visit } from "@/types/visit";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, List, MessageCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface VisitsCalendarProps {
  visits: Visit[];
  onVisitSelect: (visit: Visit) => void;
}

export const VisitsCalendar = ({ visits, onVisitSelect }: VisitsCalendarProps) => {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">En attente</Badge>;
      case "confirmed":
        return <Badge variant="default" className="bg-green-500">Confirmée</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>;
      default:
        return null;
    }
  };

  const filteredVisits = visits.filter(visit => {
    if (filter === "all") return true;
    return visit.status === filter;
  });

  const visitsForDate = (date: Date) => {
    return filteredVisits.filter(visit => {
      const visitDate = new Date(visit.date);
      return (
        visitDate.getDate() === date.getDate() &&
        visitDate.getMonth() === date.getMonth() &&
        visitDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={view === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("calendar")}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendrier
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4 mr-2" />
            Liste
          </Button>
        </div>
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les visites</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="confirmed">Confirmées</SelectItem>
            <SelectItem value="cancelled">Annulées</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {view === "calendar" ? (
        <div className="bg-white rounded-lg p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={fr}
            modifiers={{
              hasVisits: (date) => visitsForDate(date).length > 0,
            }}
            modifiersStyles={{
              hasVisits: { backgroundColor: "rgb(var(--primary))", color: "white" },
            }}
          />
          {selectedDate && visitsForDate(selectedDate).length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="font-medium">
                Visites du {format(selectedDate, "d MMMM yyyy", { locale: fr })}
              </h3>
              {visitsForDate(selectedDate).map((visit) => (
                <Card
                  key={visit.id}
                  className="p-4 cursor-pointer hover:bg-accent"
                  onClick={() => onVisitSelect(visit)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{visit.propertyTitle}</h4>
                      <p className="text-sm text-muted-foreground">{visit.time}</p>
                    </div>
                    {getStatusBadge(visit.status)}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVisits.map((visit) => (
            <Card
              key={visit.id}
              className="p-4 cursor-pointer hover:bg-accent"
              onClick={() => onVisitSelect(visit)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{visit.propertyTitle}</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(visit.date), "d MMMM yyyy", { locale: fr })} à {visit.time}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contacter l'agent
                    </Button>
                  </div>
                </div>
                {getStatusBadge(visit.status)}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};