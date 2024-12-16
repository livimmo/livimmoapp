import { useState } from "react";
import { Map, List } from "lucide-react";
import { LiveCalendarView } from "@/components/live/LiveCalendarView";
import { ScheduledLivesList } from "@/components/live/ScheduledLivesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PropertyCard } from "@/components/PropertyCard";
import { LiveGoogleMap } from "@/components/live/LiveGoogleMap";
import { scheduledLives, liveStreams } from "@/data/mockLives";
import { type Property } from "@/types/property";

const Lives = () => {
  const [currentLivesViewMode, setCurrentLivesViewMode] = useState<"list" | "map">("list");
  const [scheduledViewMode, setScheduledViewMode] = useState<"list" | "map" | "calendar">("list");

  // Convertir les lives en format Property pour les afficher avec PropertyCard et la carte
  const currentLiveProperties: Property[] = liveStreams.map((live) => ({
    id: live.id,
    title: live.title,
    price: parseInt(live.price.replace(/[^\d]/g, "")),
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
      lat: 31.7917 + Math.random() * 2 - 1, // Random coordinates for demo
      lng: -7.0926 + Math.random() * 2 - 1,
    },
    isLiveNow: true,
    viewers: live.viewers,
    remainingSeats: live.availableSeats,
  }));

  const scheduledLiveProperties: Property[] = scheduledLives.map((live) => ({
    id: live.id,
    title: live.title,
    price: parseInt(live.price.replace(/[^\d]/g, "")),
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
  }));

  return (
    <div className="container mx-auto px-4 py-8 mt-12 space-y-8">
      {/* Section des lives en cours */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            Lives en cours
          </h2>
          <div className="flex gap-2">
            <Button
              variant={currentLivesViewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentLivesViewMode("list")}
            >
              <List className="h-4 w-4 mr-2" />
              Liste
            </Button>
            <Button
              variant={currentLivesViewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentLivesViewMode("map")}
            >
              <Map className="h-4 w-4 mr-2" />
              Carte
            </Button>
          </div>
        </div>
        
        {liveStreams.length > 0 ? (
          currentLivesViewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentLiveProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="h-[500px] rounded-lg overflow-hidden">
              <LiveGoogleMap properties={currentLiveProperties} />
            </div>
          )
        ) : (
          <Card className="p-8 text-center text-muted-foreground">
            Aucun live en cours pour le moment
          </Card>
        )}
      </section>

      {/* Section des lives programmés */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Lives programmés</h2>
          <div className="flex gap-2">
            <Button
              variant={scheduledViewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setScheduledViewMode("list")}
            >
              <List className="h-4 w-4 mr-2" />
              Liste
            </Button>
            <Button
              variant={scheduledViewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setScheduledViewMode("map")}
            >
              <Map className="h-4 w-4 mr-2" />
              Carte
            </Button>
            <Button
              variant={scheduledViewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setScheduledViewMode("calendar")}
            >
              <span className="mr-2">📅</span>
              Calendrier
            </Button>
          </div>
        </div>

        {scheduledViewMode === "calendar" ? (
          <LiveCalendarView scheduledLives={scheduledLives} />
        ) : scheduledViewMode === "map" ? (
          <div className="h-[500px] rounded-lg overflow-hidden">
            <LiveGoogleMap properties={scheduledLiveProperties} />
          </div>
        ) : (
          <ScheduledLivesList lives={scheduledLives} />
        )}
      </section>
    </div>
  );
};

export default Lives;