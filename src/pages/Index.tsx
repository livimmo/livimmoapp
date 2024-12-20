import { useState } from "react";
import { type Property } from "@/types/property";
import { HomeHeader } from "@/components/home/HomeHeader";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { LiveSection } from "@/components/home/LiveSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { CTASection } from "@/components/home/CTASection";
import { VirtualToursSection } from "@/components/home/VirtualToursSection";
import { SearchSection } from "@/components/home/SearchSection";
import { featuredProperties } from "@/data/featuredProperties";
import { liveStreams, scheduledLives } from "@/data/mockLives";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CurrentLivesSection } from "@/components/home/sections/CurrentLivesSection";
import { ScheduledLivesSection } from "@/components/home/sections/ScheduledLivesSection";
import { ReplayLivesSection } from "@/components/home/sections/ReplayLivesSection";
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
  const [currentLiveViewMode, setCurrentLiveViewMode] = useState<"list" | "map">("list");
  const isMobile = useIsMobile();

  const suggestions = [
    "Casablanca", "Rabat", "Marrakech", "Tanger",
    "Agadir", "Fès", "Villa", "Appartement", "Bureau", "Riad",
  ];

  // Filtrer les lives par statut
  const currentLives = liveStreams.filter(live => live.status === "live");
  const replayLives = liveStreams.filter(live => live.status === "replay");

  // Convertir les lives en format Property pour la carte
  const currentLiveProperties: Property[] = currentLives.map(live => ({
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
    isLiveNow: true,
    viewers: live.viewers,
    remainingSeats: live.availableSeats,
    transactionType: "Vente",
  }));

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

          <div className="space-y-12">
            <CurrentLivesSection
              currentLives={currentLives}
              currentLiveProperties={currentLiveProperties}
              currentLiveViewMode={currentLiveViewMode}
              setCurrentLiveViewMode={setCurrentLiveViewMode}
            />

            <ScheduledLivesSection scheduledLives={scheduledLives} />

            <ReplayLivesSection replayLives={replayLives} />
          </div>

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
