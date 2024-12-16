import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { LiveCard } from "../live/LiveCard";
import type { LiveEvent } from "@/types/live";

// Mock data for scheduled lives with multiple events per day
const scheduledLives: LiveEvent[] = [
  {
    id: 1,
    title: "Villa Moderne avec Piscine",
    date: new Date(Date.now() + 86400000), // Tomorrow
    type: "Villa",
    location: "Marrakech",
    agent: "Sarah Martin",
    availableSeats: 15,
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    price: "2,500,000 MAD",
    description: "Magnifique villa moderne avec piscine et jardin paysager",
    status: "scheduled"
  },
  {
    id: 2,
    title: "Appartement Vue Mer",
    date: new Date(Date.now() + 86400000), // Tomorrow (same day)
    type: "Appartement",
    location: "Tanger",
    agent: "Mohammed Alami",
    availableSeats: 10,
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    price: "1,800,000 MAD",
    description: "Superbe appartement avec vue imprenable sur la mer",
    status: "scheduled"
  },
  {
    id: 3,
    title: "Penthouse Luxueux",
    date: new Date(Date.now() + 172800000), // Day after tomorrow
    type: "Appartement",
    location: "Casablanca",
    agent: "Karim Hassan",
    availableSeats: 8,
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    price: "3,200,000 MAD",
    description: "Penthouse de luxe avec terrasse panoramique",
    status: "scheduled"
  },
  {
    id: 4,
    title: "Riad Traditionnel",
    date: new Date(Date.now() + 172800000), // Day after tomorrow (same day)
    type: "Riad",
    location: "Marrakech",
    agent: "Yasmine Benali",
    availableSeats: 12,
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    price: "4,500,000 MAD",
    description: "Riad authentique au cœur de la médina",
    status: "scheduled"
  },
  {
    id: 5,
    title: "Villa Contemporaine",
    date: new Date(Date.now() + 259200000), // In 3 days
    type: "Villa",
    location: "Rabat",
    agent: "Adam Tazi",
    availableSeats: 20,
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: "5,900,000 MAD",
    description: "Villa contemporaine avec design unique",
    status: "scheduled"
  },
  {
    id: 6,
    title: "Duplex avec Terrasse",
    date: new Date(Date.now() + 259200000), // In 3 days (same day)
    type: "Appartement",
    location: "Casablanca",
    agent: "Leila Amrani",
    availableSeats: 15,
    thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    price: "2,100,000 MAD",
    description: "Magnifique duplex avec grande terrasse aménagée",
    status: "scheduled"
  },
  {
    id: 7,
    title: "Maison de Campagne",
    date: new Date(Date.now() + 345600000), // In 4 days
    type: "Villa",
    location: "Ifrane",
    agent: "Omar Bennis",
    availableSeats: 10,
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    price: "3,800,000 MAD",
    description: "Charmante maison de campagne avec vue sur la forêt",
    status: "scheduled"
  }
];

export const LiveCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const livesForSelectedDate = scheduledLives.filter(
    live => live.date.toDateString() === selectedDate?.toDateString()
  );

  const hasLivesOnDate = (date: Date) => {
    const count = scheduledLives.filter(
      live => live.date.toDateString() === date.toDateString()
    ).length;
    return count > 0;
  };

  const getLiveCount = (date: Date) => {
    return scheduledLives.filter(
      live => live.date.toDateString() === date.toDateString()
    ).length;
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
            {livesForSelectedDate.map((live) => (
              <LiveCard key={live.id} live={live} />
            ))}
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