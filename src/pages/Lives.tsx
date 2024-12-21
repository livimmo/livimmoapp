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
import { CurrentLivesSection } from "@/components/live/sections/CurrentLivesSection";

const Lives = () => {
  const [currentLivesViewMode, setCurrentLivesViewMode] = useState<"list" | "map">("list");
  const [scheduledViewMode, setScheduledViewMode] = useState<"list" | "map">("list");
  const [replayViewMode, setReplayViewMode] = useState<"list" | "map">("list");
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 1000]);
  const [viewType, setViewType] = useState<"all" | "live" | "replay">("all");
  const [transactionType, setTransactionType] = useState<string[]>(["Vente"]);

  // Filter function for both current and scheduled lives
  const filterLives = (lives: any[]) => {
    return lives.filter((live) => {
      const matchesSearch = live.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          live.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = propertyType === "all" || live.type === propertyType;
      const price = typeof live.price === 'string' 
        ? parseInt(live.price.replace(/[^\d]/g, ""))
        : live.price;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      
      return matchesSearch && matchesType && matchesPrice;
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
  ]));

  return (
    <div className="container mx-auto px-4 py-8 mt-12 space-y-8">
      {/* Hero Banner */}
      <HeroBanner properties={[]} />

      <PropertyFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        surfaceRange={surfaceRange}
        setSurfaceRange={setSurfaceRange}
        viewType={viewType}
        setViewType={setViewType}
        suggestions={suggestions}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />

      {/* Section des lives en cours */}
      <CurrentLivesSection 
        lives={filteredCurrentLives}
        viewMode={currentLivesViewMode}
        onViewModeChange={setCurrentLivesViewMode}
      />

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
            <LiveGoogleMap properties={[]} />
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
            <LiveGoogleMap properties={[]} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Lives;