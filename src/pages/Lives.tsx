import { useState } from "react";
import { Map, List } from "lucide-react";
import { LiveCalendarView } from "@/components/live/LiveCalendarView";
import { ScheduledLivesList } from "@/components/live/ScheduledLivesList";
import { ReplayCard } from "@/components/live/ReplayCard";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { LiveGoogleMap } from "@/components/live/LiveGoogleMap";
import { scheduledLives, liveStreams } from "@/data/mockLives";
import { type Property } from "@/types/property";
import { PropertyFilters } from "@/components/properties/PropertyFilters";

const Lives = () => {
  const [currentLivesViewMode, setCurrentLivesViewMode] = useState<"list" | "map">("list");
  const [scheduledViewMode, setScheduledViewMode] = useState<"list" | "map" | "calendar">("list");
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 1000]);
  const [showLiveOnly, setShowLiveOnly] = useState(true);

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
      
      // Note: Surface filtering is commented out as it's not available in the mock data
      // Would need to add surface data to implement this filter
      
      return matchesSearch && matchesType && matchesPrice;
    });
  };

  const filteredCurrentLives = filterLives(liveStreams);
  const filteredScheduledLives = filterLives(scheduledLives);

  // Convert current lives to Property format for the map
  const currentLiveProperties: Property[] = filteredCurrentLives.map((live) => ({
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
    isLiveNow: true,
    viewers: live.viewers,
    remainingSeats: live.availableSeats,
  }));

  // Suggestions based on available locations and types
  const suggestions = Array.from(new Set([
    ...liveStreams.map(live => live.location),
    ...liveStreams.map(live => live.type),
    ...scheduledLives.map(live => live.location),
    ...scheduledLives.map(live => live.type),
  ]));

  return (
    <div className="container mx-auto px-4 py-8 mt-12 space-y-8">
      {/* Filters Section */}
      <PropertyFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        surfaceRange={surfaceRange}
        setSurfaceRange={setSurfaceRange}
        showLiveOnly={showLiveOnly}
        setShowLiveOnly={setShowLiveOnly}
        suggestions={suggestions}
      />

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
        <h2 className="text-2xl font-bold mb-6">Lives programmés</h2>
        <ScheduledLivesList lives={filteredScheduledLives} />
      </section>

      {/* Section des replays */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Replays disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {replayLives.map((live) => (
            <ReplayCard key={live.id} live={live} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Lives;