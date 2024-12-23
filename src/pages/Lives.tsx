import { useState } from "react";
import { Map, List } from "lucide-react";
import { LiveCalendarView } from "@/components/live/LiveCalendarView";
import { ScheduledLivesList } from "@/components/live/ScheduledLivesList";
import { ReplayCard } from "@/components/live/ReplayCard";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { LiveGoogleMap } from "@/components/live/LiveGoogleMap";
import { scheduledLives, liveStreams, replayLives } from "@/data/mockLives";
import { type Property } from "@/types/property";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { HeroBanner } from "@/components/home/HeroBanner";
import { LiveSearchBar } from "@/components/live/search/LiveSearchBar";

const Lives = () => {
  const [currentLivesViewMode, setCurrentLivesViewMode] = useState<"list" | "map">("list");
  const [scheduledViewMode, setScheduledViewMode] = useState<"list" | "map">("list");
  const [replayViewMode, setReplayViewMode] = useState<"list" | "map">("list");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter function for both current and scheduled lives
  const filterLives = (lives: any[]) => {
    return lives.filter((live) => {
      const matchesSearch = live.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          live.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          live.agent.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  };

  const filteredCurrentLives = filterLives(liveStreams);
  const filteredScheduledLives = filterLives(scheduledLives);
  const filteredReplayLives = filterLives(replayLives);

  // Suggestions based on available locations and types
  const suggestions = Array.from(new Set([
    ...liveStreams.map(live => live.location),
    ...liveStreams.map(live => live.type),
    ...scheduledLives.map(live => live.location),
    ...scheduledLives.map(live => live.type),
    ...replayLives.map(live => live.location),
    ...replayLives.map(live => live.type),
  ])).filter(suggestion => 
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Convert current lives to Property format for the map
  const currentLiveProperties: Property[] = filteredCurrentLives.map((live) => ({
    id: live.id.toString(),
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
      id: "1",
      name: live.agent,
      avatar: "",
      image: "",
      phone: "",
      email: "",
      location: live.location,
      type: "agent",
    },
    coordinates: {
      lat: 31.7917 + Math.random() * 2 - 1,
      lng: -7.0926 + Math.random() * 2 - 1,
    },
    isLiveNow: true,
    viewers: live.viewers,
    remainingSeats: live.availableSeats,
    transactionType: "Vente"
  }));

  return (
    <div className="container mx-auto px-4 py-8 mt-12 space-y-8">
      <HeroBanner properties={currentLiveProperties} />
      
      <LiveSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestions={suggestions}
      />

      {/* Section des lives en cours */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            Lives en cours
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({filteredCurrentLives.length})
            </span>
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
        
        {filteredCurrentLives.length > 0 ? (
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
          <div className="text-center text-muted-foreground">
            Aucun live en cours pour le moment
          </div>
        )}
      </section>

      {/* Section des lives programmés */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Lives programmés
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({filteredScheduledLives.length})
            </span>
          </h2>
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
          </div>
        </div>

        {scheduledViewMode === "list" ? (
          <ScheduledLivesList lives={filteredScheduledLives} />
        ) : (
          <div className="h-[500px] rounded-lg overflow-hidden">
            <LiveGoogleMap properties={filteredScheduledLives} />
          </div>
        )}
      </section>

      {/* Section des replays */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Replays disponibles
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({filteredReplayLives.length})
            </span>
          </h2>
          <div className="flex gap-2">
            <Button
              variant={replayViewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setReplayViewMode("list")}
            >
              <List className="h-4 w-4 mr-2" />
              Liste
            </Button>
            <Button
              variant={replayViewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setReplayViewMode("map")}
            >
              <Map className="h-4 w-4 mr-2" />
              Carte
            </Button>
          </div>
        </div>

        {replayViewMode === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReplayLives.map((live) => (
              <ReplayCard key={live.id} live={live} />
            ))}
          </div>
        ) : (
          <div className="h-[500px] rounded-lg overflow-hidden">
            <LiveGoogleMap properties={filteredReplayLives} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Lives;
