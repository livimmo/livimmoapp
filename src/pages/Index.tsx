import { useState } from "react";
import { type Property } from "@/types/property";
import { HomeHeader } from "@/components/home/HomeHeader";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { CTASection } from "@/components/home/CTASection";
import { VirtualToursSection } from "@/components/home/VirtualToursSection";
import { featuredProperties } from "@/data/featuredProperties";
import { liveStreams, scheduledLives } from "@/data/mockLives";
import { HeroBanner } from "@/components/home/HeroBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrentLivesSection } from "@/components/home/sections/CurrentLivesSection";
import { ScheduledLivesSection } from "@/components/home/sections/ScheduledLivesSection";
import { ReplayLivesSection } from "@/components/home/sections/ReplayLivesSection";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 1000]);
  const [viewType, setViewType] = useState<"all" | "live" | "replay">("all");
  const [transactionType, setTransactionType] = useState<string[]>(["Vente"]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [currentLiveViewMode, setCurrentLiveViewMode] = useState<"list" | "map">("list");

  const suggestions = [
    "Casablanca", "Rabat", "Marrakech", "Tanger",
    "Agadir", "Fès", "Villa", "Appartement", "Bureau", "Riad",
  ];

  const currentLives = liveStreams.filter(live => live.status === "live");
  const replayLives = liveStreams.filter(live => live.status === "replay");

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

  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background pb-20">
      <HomeHeader />

      <main className="container mx-auto pt-16">
        <div className="max-w-full mx-auto px-4">
          <HeroBanner 
            properties={featuredProperties}
            currentLives={currentLives}
            replays={replayLives}
          />

          <div className={`${isMobile ? 'sticky top-16 z-20 bg-background/95 backdrop-blur-sm py-2' : ''}`}>
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
          </div>

          <div className="my-8">
            <Tabs defaultValue="lives" className="w-full">
              <TabsList className={`mb-8 ${isMobile ? 'w-full grid grid-cols-3' : ''}`}>
                <TabsTrigger value="lives" className={isMobile ? 'flex-1' : ''}>Lives</TabsTrigger>
                <TabsTrigger value="properties" className={isMobile ? 'flex-1' : ''}>À vendre</TabsTrigger>
                <TabsTrigger value="virtual" className={isMobile ? 'flex-1' : ''}>Visites 360°</TabsTrigger>
              </TabsList>

              <TabsContent value="lives" className="space-y-8">
                <CurrentLivesSection
                  currentLives={currentLives}
                  currentLiveProperties={currentLiveProperties}
                  currentLiveViewMode={currentLiveViewMode}
                  setCurrentLiveViewMode={setCurrentLiveViewMode}
                />
                <ScheduledLivesSection scheduledLives={scheduledLives} />
                <ReplayLivesSection replayLives={replayLives} />
              </TabsContent>

              <TabsContent value="properties">
                <FeaturedSection properties={featuredProperties} />
              </TabsContent>

              <TabsContent value="virtual">
                <VirtualToursSection properties={featuredProperties} />
              </TabsContent>
            </Tabs>
          </div>

          <CTASection />
        </div>
      </main>
    </div>
  );
};

export default Index;
