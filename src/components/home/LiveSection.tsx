import { useState } from "react";
import { Map, List, Play, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyCard } from "@/components/PropertyCard";
import { LiveGoogleMap } from "@/components/live/LiveGoogleMap";
import { ReplayCard } from "@/components/live/ReplayCard";
import { liveStreams } from "@/data/mockLives";
import { type Property } from "@/types/property";
import { type LiveEvent } from "@/types/live";

export const LiveSection = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Séparer les lives en cours des replays
  const currentLives = liveStreams.filter(live => live.status === "live");
  const replayLives = liveStreams.filter(live => live.status === "replay");

  // Convertir les lives en format Property
  const convertToProperty = (live: any): Property => ({
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
    isLiveNow: live.status === "live",
    viewers: live.viewers,
    remainingSeats: live.availableSeats,
    transactionType: Math.random() > 0.5 ? "Vente" : "Location",
  });

  const currentProperties = currentLives.map(convertToProperty);
  const replayProperties = replayLives.map(convertToProperty);

  if (currentLives.length === 0 && replayLives.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tous nos lives</h2>
        <p className="text-muted-foreground text-center py-8">
          Aucun live disponible pour le moment
        </p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tous nos lives</h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-2" />
            Liste
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
          >
            <Map className="h-4 w-4 mr-2" />
            Carte
          </Button>
        </div>
      </div>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList>
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Lives en cours ({currentLives.length})
          </TabsTrigger>
          <TabsTrigger value="replay" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Replays ({replayLives.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="h-[500px] rounded-lg overflow-hidden">
              <LiveGoogleMap properties={currentProperties} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="replay">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {replayLives.map((live) => (
                <ReplayCard key={live.id} live={live} />
              ))}
            </div>
          ) : (
            <div className="h-[500px] rounded-lg overflow-hidden">
              <LiveGoogleMap properties={replayProperties} />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};