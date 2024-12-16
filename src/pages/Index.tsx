import { Video, List, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveSection } from "@/components/home/LiveSection";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PropertyMap } from "@/components/search/PropertyMap";
import { PropertyList } from "@/components/properties/PropertyList";
import { type Property } from "@/types/property";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { HomeFilters } from "@/components/home/HomeFilters";
import { CTASection } from "@/components/home/CTASection";
import { addCoordinatesToProperties } from "@/data/mockProperties";
import { SmartSearchBar } from "@/components/search/SmartSearchBar";
import { HomeHeader } from "@/components/home/HomeHeader";
import { LiveSlider } from "@/components/live/LiveSlider";
import { liveStreams, scheduledLives } from "@/data/mockLives";
import { PropertyFilters } from "@/components/properties/PropertyFilters";

const featuredProperties = addCoordinatesToProperties([
  {
    id: 1,
    title: "Villa Moderne avec Piscine",
    price: 2500000,
    location: "Marrakech",
    type: "Villa",
    surface: 350,
    rooms: 5,
    bathrooms: 3,
    description: "Magnifique villa moderne avec piscine et jardin paysager",
    features: ["Piscine", "Jardin", "Garage", "Climatisation", "Sécurité 24/7"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    ],
    hasLive: true,
    liveDate: new Date("2024-03-15"),
    agent: {
      name: "Karim Benjelloun",
      image: "https://i.pravatar.cc/150?u=karim",
      phone: "+212 6 00 11 22 33",
      email: "karim.benjelloun@example.com",
    },
  },
  {
    id: 2,
    title: "Appartement Vue Mer",
    price: 1800000,
    location: "Tanger",
    type: "Appartement",
    surface: 120,
    rooms: 3,
    bathrooms: 2,
    description: "Superbe appartement avec vue panoramique sur la mer",
    features: ["Vue mer", "Terrasse", "Ascenseur", "Parking", "Cuisine équipée"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    ],
    hasLive: false,
    agent: {
      name: "Sophia Martinez",
      image: "https://i.pravatar.cc/150?u=sophia",
      phone: "+212 6 11 22 33 44",
      email: "sophia.martinez@example.com",
    },
  },
  {
    id: 3,
    title: "Penthouse Luxueux",
    price: 3200000,
    location: "Casablanca",
    type: "Appartement",
    surface: 200,
    rooms: 4,
    bathrooms: 3,
    description: "Penthouse de luxe avec terrasse panoramique",
    features: ["Terrasse", "Vue panoramique", "Parking", "Salle de sport", "Spa"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    ],
    hasLive: true,
    liveDate: new Date("2024-03-20"),
    agent: {
      name: "Yasmine Alaoui",
      image: "https://i.pravatar.cc/150?u=yasmine",
      phone: "+212 6 22 33 44 55",
      email: "yasmine.alaoui@example.com",
    },
  },
]);

const Index = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 1000]);
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const suggestions = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Tanger",
    "Agadir",
    "Fès",
    "Villa",
    "Appartement",
    "Bureau",
    "Riad",
  ];

  const allLives = [...liveStreams, ...scheduledLives];

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
          showLiveOnly={showLiveOnly}
          setShowLiveOnly={setShowLiveOnly}
          suggestions={suggestions}
        />

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Lives et Replays</h2>
          <LiveSlider lives={allLives} />
        </section>
        
        <FeaturedSection properties={featuredProperties} />

        <LiveSection />

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {filteredProperties.length > 0 
                ? `${filteredProperties.length} biens trouvés`
                : "Tous nos biens"
              }
            </h2>
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
          
          {viewMode === "list" ? (
            <PropertyList 
              properties={filteredProperties.length > 0 ? filteredProperties : featuredProperties}
              viewMode="grid"
            />
          ) : (
            <div className="h-[500px] rounded-lg overflow-hidden">
              <PropertyMap 
                properties={filteredProperties.length > 0 ? filteredProperties : featuredProperties} 
              />
            </div>
          )}
        </section>

        <CTASection />
      </main>
    </div>
  );
};

export default Index;
