import { useState, useEffect } from "react";
import { type Property } from "@/types/property";
import { HomeHeader } from "@/components/home/HomeHeader";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { CTASection } from "@/components/home/CTASection";
import { VirtualToursSection } from "@/components/home/VirtualToursSection";
import { SearchSection } from "@/components/home/SearchSection";
import { featuredProperties } from "@/data/featuredProperties";
import { liveStreams } from "@/data/mockLives";
import { HeroBanner } from "@/components/home/HeroBanner";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 1000]);
  const [viewType, setViewType] = useState<"all" | "live" | "replay">("all");
  const [transactionType, setTransactionType] = useState<string[]>(["Vente"]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const isMobile = useIsMobile();

  const suggestions = [
    "Casablanca", "Rabat", "Marrakech", "Tanger",
    "Agadir", "Fès", "Villa", "Appartement", "Bureau", "Riad",
  ];

  // Filtrer les lives par statut pour la bannière
  const currentLives = liveStreams.filter(live => live.status === "live");
  const replayLives = liveStreams.filter(live => live.status === "replay");

  // Effet pour filtrer les propriétés en fonction des critères de recherche
  useEffect(() => {
    const filterProperties = () => {
      let filtered = [...featuredProperties];

      // Filtre par terme de recherche (ville, type de bien, etc.)
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(property => 
          property.location.toLowerCase().includes(searchLower) ||
          property.type.toLowerCase().includes(searchLower) ||
          property.title.toLowerCase().includes(searchLower)
        );
      }

      // Filtre par type de bien
      if (propertyType !== "all") {
        filtered = filtered.filter(property => 
          property.type.toLowerCase() === propertyType.toLowerCase()
        );
      }

      // Filtre par plage de prix
      filtered = filtered.filter(property => 
        property.price >= priceRange[0] && 
        property.price <= priceRange[1]
      );

      // Filtre par surface
      filtered = filtered.filter(property => 
        property.surface >= surfaceRange[0] && 
        property.surface <= surfaceRange[1]
      );

      // Filtre par type de transaction
      if (transactionType.length > 0) {
        filtered = filtered.filter(property => 
          transactionType.includes(property.transactionType)
        );
      }

      setFilteredProperties(filtered);
    };

    filterProperties();
  }, [searchTerm, propertyType, priceRange, surfaceRange, transactionType]);

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />

      <main className={`container mx-auto px-4 ${isMobile ? 'pt-4' : 'pt-20'} max-w-7xl`}>
        <div className="max-w-[1400px] mx-auto space-y-12">
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

          <ScrollArea className="h-full pb-8">
            <VirtualToursSection properties={featuredProperties} />
          </ScrollArea>

          <div className="pb-12">
            <FeaturedSection properties={featuredProperties} />
          </div>

          <SearchSection 
            filteredProperties={filteredProperties} 
            defaultProperties={featuredProperties}
          />

          <CTASection />
        </div>
      </main>
    </div>
  );
};

export default Index;