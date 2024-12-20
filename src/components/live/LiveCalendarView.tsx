import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { ScheduledLivesList } from "./ScheduledLivesList";
import type { LiveEvent } from "@/types/live";

interface LiveCalendarViewProps {
  scheduledLives: LiveEvent[];
}

export const LiveCalendarView = ({ scheduledLives }: LiveCalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

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
    <div className="space-y-6">
      <Card className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-lg border"
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
      </Card>

      <div className="space-y-4">
        {livesForSelectedDate.length > 0 ? (
          <>
            <h3 className="text-lg font-semibold text-gray-900">
              {livesForSelectedDate.length} live{livesForSelectedDate.length > 1 ? 's' : ''} programmé{livesForSelectedDate.length > 1 ? 's' : ''} le {selectedDate?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
            </h3>
            <ScheduledLivesList lives={livesForSelectedDate} />
          </>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Aucun live programmé pour cette date
          </div>
        )}
      </div>
    </div>
  );
};