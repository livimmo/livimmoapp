import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { LiveCalendarHeader } from "./calendar/LiveCalendarHeader";
import { LiveCalendarContent } from "./calendar/LiveCalendarContent";
import { scheduledLives } from "@/data/mockLives";
import { cn } from "@/lib/utils";

export const LiveCalendar = ({ defaultDate }: { defaultDate: Date }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultDate);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const livesForSelectedDate = scheduledLives.filter(live => {
    const liveDate = live.date instanceof Date ? live.date : new Date(live.date);
    return selectedDate && liveDate.toDateString() === selectedDate.toDateString();
  });

  // Fonction pour compter les lives pour une date donnée
  const getLiveCountForDate = (date: Date) => {
    return scheduledLives.filter(live => {
      const liveDate = live.date instanceof Date ? live.date : new Date(live.date);
      return liveDate.toDateString() === date.toDateString();
    }).length;
  };

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
          components={{
            Day: ({ day, date, ...props }) => {
              const liveCount = getLiveCountForDate(date);
              return (
                <div className="relative w-9 h-9">
                  <div
                    {...props}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center",
                      liveCount > 0 && "font-bold text-red-500"
                    )}
                  >
                    {date.getDate()}
                  </div>
                  {liveCount > 0 && (
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium text-red-500">
                      {liveCount}
                    </div>
                  )}
                </div>
              );
            },
          }}
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