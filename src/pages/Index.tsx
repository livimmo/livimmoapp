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

  const allLives = [...liveStreams, ...scheduledLives];

  const filterPropertiesByViewType = (properties: Property[]) => {
    switch (viewType) {
      case "live":
        return properties.filter(p => p.hasLive && !p.isReplay);
      case "replay":
        return properties.filter(p => p.hasLive && p.isReplay);
      default:
        return properties;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />

      <main className="container mx-auto px-4 pt-20">
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

        <HomeMap properties={featuredProperties} />

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Lives et Replays</h2>
          <LiveSlider lives={allLives} />
        </section>
        
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