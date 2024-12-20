import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { LiveCalendarHeader } from "./calendar/LiveCalendarHeader";
import { LiveCalendarContent } from "./calendar/LiveCalendarContent";
import { scheduledLives } from "@/data/mockLives";

export const LiveCalendar = ({ defaultDate }: { defaultDate: Date }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultDate);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const livesForSelectedDate = scheduledLives.filter(live => {
    const liveDate = live.date instanceof Date ? live.date : new Date(live.date);
    return selectedDate && liveDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="space-y-4">
      <LiveCalendarHeader 
        viewMode={viewMode} 
        onViewChange={setViewMode}
        liveCount={livesForSelectedDate.length}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
        <LiveCalendarContent
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>
    </div>
  );
};