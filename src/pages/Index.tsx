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
import { addCoordinatesToProperties } from "@/data/mockProperties";
import { liveStreams, scheduledLives } from "@/data/mockLives";

// Ajout de propriétés avec des visites virtuelles pour l'exemple
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
    transactionType: "Vente" as const,
    virtualTour: {
      enabled: true,
      url: "https://my.matterport.com/show/?m=SxQL3iGyvQk",
      type: "360" as const,
      hotspots: [
        {
          title: "Salon",
          description: "Spacieux salon avec vue sur la piscine",
          position: { x: 30, y: 40 },
          details: [
            { label: "Surface", value: "45m²" },
            { label: "Exposition", value: "Sud" }
          ]
        }
      ]
    }
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
    transactionType: "Location" as const,
    virtualTour: {
      enabled: true,
      url: "https://my.matterport.com/show/?m=SxQL3iGyvQk",
      type: "360" as const,
      hotspots: [
        {
          title: "Chambre",
          description: "Chambre spacieuse avec vue sur la mer",
          position: { x: 50, y: 50 },
          details: [
            { label: "Surface", value: "30m²" },
            { label: "Exposition", value: "Est" }
          ]
        }
      ]
    }
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
    transactionType: "Vente" as const,
    virtualTour: {
      enabled: true,
      url: "https://my.matterport.com/show/?m=SxQL3iGyvQk",
      type: "360" as const,
      hotspots: [
        {
          title: "Terrasse",
          description: "Terrasse avec vue imprenable sur la ville",
          position: { x: 70, y: 30 },
          details: [
            { label: "Surface", value: "50m²" },
            { label: "Exposition", value: "Ouest" }
          ]
        }
      ]
    }
  },
]);

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

  // Filtrer les propriétés en fonction du viewType
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

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Lives et Replays</h2>
          <LiveSlider lives={allLives} />
        </section>
        
        <FeaturedSection properties={filterPropertiesByViewType(featuredProperties)} />

        <VirtualToursSection properties={featuredProperties} />

        <LiveSection />

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
