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

      <main className="container mx-auto px-4 pt-20 max-w-7xl">
        <div className="max-w-[1400px] mx-auto">
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

          <div className="my-12 space-y-12">
            {/* Section Lives en cours */}
            {currentLives.length > 0 && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-8">Lives en cours</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <LiveSlider lives={currentLives} />
                </div>
              </section>
            )}

            {/* Section Lives programmés */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-8">Lives programmés</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <LiveCalendar />
                </div>
                <div className="space-y-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Prochains lives</h3>
                    {scheduledLives.slice(0, 3).map((live) => (
                      <div key={live.id} className="p-2 hover:bg-accent rounded-lg transition-colors">
                        <p className="font-medium">{live.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(live.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    ))}
                  </Card>
                </div>
              </div>
            </section>

            {/* Section Replays */}
            {replayLives.length > 0 && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-8">Replays disponibles</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <LiveSlider lives={replayLives} />
                </div>
              </section>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-12">
            <VirtualToursSection properties={featuredProperties} />
            <FeaturedSection properties={filterPropertiesByViewType(featuredProperties)} />
          </div>

          <SearchSection 
            filteredProperties={filterPropertiesByViewType(filteredProperties)} 
            defaultProperties={filterPropertiesByViewType(featuredProperties)}
          />

          <CTASection />
        </div>
      </main>
    </div>
  );
};

export default Index;