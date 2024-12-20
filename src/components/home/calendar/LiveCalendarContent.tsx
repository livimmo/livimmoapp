import { useState } from "react";
import { LiveCard } from "../../live/LiveCard";
import type { LiveEvent } from "@/types/live";
import { scheduledLives } from "@/data/mockLives";
import { GoogleMapContainer } from "../map/GoogleMapContainer";
import { Property } from "@/types/property";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LiveCalendarContentProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  viewMode: "list" | "map";
  setViewMode: (mode: "list" | "map") => void;
}

export const LiveCalendarContent = ({ 
  selectedDate, 
  setSelectedDate,
  viewMode,
  setViewMode
}: LiveCalendarContentProps) => {
  const livesForSelectedDate = scheduledLives.filter(live => {
    const liveDate = live.date instanceof Date ? live.date : new Date(live.date);
    return selectedDate && liveDate.toDateString() === selectedDate.toDateString();
  });

  // Convertir les lives en format Property pour la carte
  const propertyLives: Property[] = livesForSelectedDate.map(live => ({
    id: live.id,
    title: live.title,
    price: typeof live.price === 'string' ? parseInt(live.price.replace(/[^\d]/g, "")) : live.price,
    location: live.location,
    type: live.type,
    surface: 0,
    rooms: 0,
    bathrooms: 0,
    description: live.description || "",
    features: [],
    images: [live.thumbnail],
    hasLive: true,
    liveDate: live.date,
    agent: {
      name: live.agent,
      image: "",
      phone: "",
      email: "",
    },
    coordinates: {
      lat: 31.7917 + Math.random() * 2 - 1,
      lng: -7.0926 + Math.random() * 2 - 1,
    },
    isLiveNow: false,
    viewers: 0,
    remainingSeats: live.availableSeats,
    transactionType: "Vente",
  }));

  return (
    <div className="space-y-4 h-[500px]">
      {viewMode === "list" ? (
        <ScrollArea className="h-full pr-4">
          <div className="grid grid-cols-1 gap-4">
            {livesForSelectedDate.length > 0 ? (
              livesForSelectedDate.map((live) => (
                <LiveCard key={live.id} live={live} />
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                {selectedDate ? "Aucun live programmé pour cette date" : "Sélectionnez une date pour voir les lives programmés"}
              </div>
            )}
          </div>
        </ScrollArea>
      ) : (
        <div className="h-full rounded-lg overflow-hidden border border-gray-200">
          <GoogleMapContainer properties={propertyLives} />
        </div>
      )}
    </div>
  );
};