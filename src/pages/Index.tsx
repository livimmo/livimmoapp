import { Video, Bell, User, List, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/home/SearchBar";
import { LiveSection } from "@/components/home/LiveSection";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PropertyMap } from "@/components/search/PropertyMap";
import { PropertyList } from "@/components/search/PropertyList";
import { type Property } from "@/types/property";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { HomeFilters } from "@/components/home/HomeFilters";
import { CTASection } from "@/components/home/CTASection";
import { addCoordinatesToProperties } from "@/data/mockProperties";

const Index = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

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

  const allProperties = addCoordinatesToProperties([
    ...featuredProperties,
    {
      id: 4,
      title: "Riad Traditionnel",
      price: 4200000,
      location: "Fès",
      type: "Riad",
      surface: 400,
      rooms: 6,
      bathrooms: 4,
      description: "Magnifique riad traditionnel au cœur de la médina",
      features: ["Patio", "Fontaine", "Terrasse", "Hammam", "Salon marocain"],
      images: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      ],
      hasLive: false,
      agent: {
        name: "Hassan El Fassi",
        image: "https://i.pravatar.cc/150?u=hassan",
        phone: "+212 6 33 44 55 66",
        email: "hassan.elfassi@example.com",
      },
    },
  ]);

  const liveProperties = allProperties.filter(prop => prop.hasLive);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">Livimmo</h1>
            <Video className="h-5 w-5 text-[#ea384c]" />
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/notifications')}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/profile')}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20">
        <SearchBar />
        
        {/* Featured Properties Section */}
        <FeaturedSection properties={featuredProperties} />

        {/* Live Properties Section */}
        <LiveSection properties={liveProperties} />

        {/* Filters Section */}
        <HomeFilters 
          properties={allProperties}
          onFiltersChange={setFilteredProperties}
        />

        {/* All Properties Section */}
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
              properties={filteredProperties.length > 0 ? filteredProperties : allProperties} 
              viewMode="list" 
            />
          ) : (
            <PropertyMap 
              properties={filteredProperties.length > 0 ? filteredProperties : allProperties} 
            />
          )}
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>
    </div>
  );
};
