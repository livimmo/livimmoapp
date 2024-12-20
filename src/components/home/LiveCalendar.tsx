import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { LiveCard } from "../live/LiveCard";
import type { LiveEvent } from "@/types/live";
import { PropertyViewToggle } from "@/components/properties/PropertyViewToggle";
import { GoogleMapContainer } from "./map/GoogleMapContainer";
import { LiveCalendarContent } from "./calendar/LiveCalendarContent";
import { LiveCalendarHeader } from "./calendar/LiveCalendarHeader";

interface LiveCalendarProps {
  defaultDate?: Date;
}

export const LiveCalendar = ({ defaultDate = new Date() }: LiveCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultDate);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-4">
        <LiveCalendarHeader />
        <LiveCalendarContent 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </Card>
    </div>
  );
};