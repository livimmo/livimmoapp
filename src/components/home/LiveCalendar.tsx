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

  const hasLivesOnDate = (date: Date) => {
    return scheduledLives.filter(live => {
      const liveDate = live.date instanceof Date ? live.date : new Date(live.date);
      return liveDate.toDateString() === date.toDateString();
    }).length > 0;
  };

  const getLiveCount = (date: Date) => {
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
          modifiers={{
            hasLive: (date) => hasLivesOnDate(date),
          }}
          modifiersStyles={{
            hasLive: {
              backgroundColor: "#fef2f2",
              color: "#ea384c",
              fontWeight: "bold"
            }
          }}
          components={{
            DayContent: ({ date }) => {
              const count = getLiveCount(date);
              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  {date.getDate()}
                  {count > 0 && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-[#ea384c]">
                      {count}
                    </span>
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