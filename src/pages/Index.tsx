import { useState } from "react";
import { type Property } from "@/types/property";
import { HomeHeader } from "@/components/home/HomeHeader";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { LiveSection } from "@/components/home/LiveSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { CTASection } from "@/components/home/CTASection";
import { LiveSlider } from "@/components/live/LiveSlider";
import { VirtualToursSection } from "@/components/home/VirtualToursSection";
import { SearchSection } from "@/components/home/SearchSection";
import { HomeMap } from "@/components/home/HomeMap";
import { addCoordinatesToProperties } from "@/data/mockProperties";
import { liveStreams, scheduledLives } from "@/data/mockLives";
import { featuredProperties } from "@/data/featuredProperties";
import { HeroBanner } from "@/components/home/HeroBanner";
import { LiveCalendar } from "@/components/home/LiveCalendar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 1000]);
  const [viewType, setViewType] = useState<"all" | "live" | "replay">("all");
  const [transactionType, setTransactionType] = useState<string[]>(["Vente"]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  const suggestions = [
    "Casablanca", "Rabat", "Marrakech", "Tanger",
    "Agadir", "Fès", "Villa", "Appartement", "Bureau", "Riad",
  ];

  const filterPropertiesByViewType = (properties: Property[]) => {
    switch (viewType) {
      case "live":
        return properties.filter(property => property.hasLive && !property.isReplay);
      case "replay":
        return properties.filter(property => property.hasLive && property.isReplay);
      default:
        return properties;
    }
  };

  // Filtrer les lives par statut
  const currentLives = liveStreams.filter(live => live.status === "live");
  const replayLives = liveStreams.filter(live => live.status === "replay");

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />

      <main className="container mx-auto px-4 pt-20">
        <HeroBanner 
          properties={featuredProperties}
          currentLives={currentLives}
          replays={replayLives}
        />

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

        <div className="my-12 space-y-8">
          {/* Section Lives en cours */}
          {currentLives.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Lives en cours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LiveSlider lives={currentLives} />
              </div>
            </section>
          )}

          {/* Section Lives programmés */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Lives programmés</h2>
            <LiveCalendar />
          </section>

          {/* Section Replays */}
          {replayLives.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Replays disponibles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LiveSlider lives={replayLives} />
              </div>
            </section>
          )}
        </div>

        <VirtualToursSection properties={featuredProperties} />
        
        <FeaturedSection properties={filterPropertiesByViewType(featuredProperties)} />

        <SearchSection 
          filteredProperties={filterPropertiesByViewType(filteredProperties)} 
          defaultProperties={filterPropertiesByViewType(featuredProperties)}
        />

        <CTASection />
      </main>
    </div>
  );
};

export default Index;