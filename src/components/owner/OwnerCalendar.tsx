import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { fr } from "date-fns/locale";
import { mockVisits } from "@/data/mockVisits";

export const OwnerCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // TODO: Remplacer par des données réelles
  const visits = mockVisits;

  const selectedDateVisits = visits.filter(
    (visit) =>
      selectedDate &&
      visit.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="grid md:grid-cols-[300px,1fr] gap-8">
      <Card className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          locale={fr}
          className="rounded-md"
        />
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">
          {selectedDateVisits.length > 0
            ? `Visites du ${selectedDate?.toLocaleDateString()}`
            : "Aucune visite prévue pour cette date"}
        </h3>
        
        <div className="space-y-4">
          {selectedDateVisits.map((visit) => (
            <Card key={visit.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{visit.propertyTitle}</h4>
                  <p className="text-sm text-muted-foreground">
                    {visit.propertyLocation}
                  </p>
                  <p className="text-sm mt-2">
                    Visiteur: {visit.visitor.name}
                  </p>
                  <p className="text-sm">
                    Contact: {visit.visitor.phone}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{visit.time}</p>
                  <p className="text-sm text-muted-foreground">
                    {visit.type === "physical" ? "Visite physique" : "Visite virtuelle"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};