import { Video, Bell, User, List, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBanner } from "@/components/home/HeroBanner";
import { SearchBar } from "@/components/home/SearchBar";
import { LiveSection } from "@/components/home/LiveSection";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PropertyMap } from "@/components/search/PropertyMap";
import { PropertyList } from "@/components/search/PropertyList";
import { Property } from "@/types/property";

const Index = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const allProperties: Property[] = [
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
      tags: ["Nouveauté"],
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
      tags: ["Coup de fusil"],
      agent: {
        name: "Yasmine Alaoui",
        image: "https://i.pravatar.cc/150?u=yasmine",
        phone: "+212 6 22 33 44 55",
        email: "yasmine.alaoui@example.com",
      },
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      title: "Riad Traditionnel",
      price: 4200000,
      location: "Fès",
      type: "Riad",
      surface: 400,
      rooms: 6,
      hasLive: false,
      tags: ["Exclusivité"],
      agent: {
        name: "Agent 1",
        image: "https://i.pravatar.cc/150?u=agent1",
        phone: "+212 6 00 00 00 01",
        email: "agent1@example.com",
      },
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
      title: "Villa de Luxe",
      price: 5500000,
      location: "Rabat",
      type: "Villa",
      surface: 500,
      rooms: 7,
      tags: ["Nouveauté"],
      agent: {
        name: "Agent 2",
        image: "https://i.pravatar.cc/150?u=agent2",
        phone: "+212 6 00 00 00 02",
        email: "agent2@example.com",
      },
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      title: "Duplex Modern",
      price: 2100000,
      location: "Casablanca",
      type: "Appartement",
      surface: 180,
      rooms: 4,
      tags: ["Coup de fusil"],
      agent: {
        name: "Agent 3",
        image: "https://i.pravatar.cc/150?u=agent3",
        phone: "+212 6 00 00 00 03",
        email: "agent3@example.com",
      },
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      title: "Villa avec Jardin",
      price: 3800000,
      location: "Marrakech",
      type: "Villa",
      surface: 450,
      rooms: 6,
      hasLive: true,
      tags: ["Live"],
      agent: {
        name: "Agent 4",
        image: "https://i.pravatar.cc/150?u=agent4",
        phone: "+212 6 00 00 00 04",
        email: "agent4@example.com",
      },
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      title: "Studio Premium",
      price: 900000,
      location: "Tanger",
      type: "Appartement",
      surface: 60,
      rooms: 1,
      tags: ["Nouveauté"],
      agent: {
        name: "Agent 5",
        image: "https://i.pravatar.cc/150?u=agent5",
        phone: "+212 6 00 00 00 05",
        email: "agent5@example.com",
      },
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      title: "Riad de Charme",
      price: 3500000,
      location: "Marrakech",
      type: "Riad",
      surface: 300,
      rooms: 5,
      tags: ["Exclusivité"],
      agent: {
        name: "Agent 6",
        image: "https://i.pravatar.cc/150?u=agent6",
        phone: "+212 6 00 00 00 06",
        email: "agent6@example.com",
      },
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
      title: "Appartement Haut Standing",
      price: 2800000,
      location: "Casablanca",
      type: "Appartement",
      surface: 200,
      rooms: 4,
      hasLive: true,
      tags: ["Live", "Coup de fusil"],
      agent: {
        name: "Agent 7",
        image: "https://i.pravatar.cc/150?u=agent7",
        phone: "+212 6 00 00 00 07",
        email: "agent7@example.com",
      },
    },
    {
      id: 20,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      title: "Villa d'Exception",
      price: 6500000,
      location: "Rabat",
      type: "Villa",
      surface: 600,
      rooms: 8,
      tags: ["Exclusivité", "Coup de fusil"],
      agent: {
        name: "Agent 8",
        image: "https://i.pravatar.cc/150?u=agent8",
        phone: "+212 6 00 00 00 08",
        email: "agent8@example.com",
      },
    }
  ];

  const featuredProperties = allProperties.slice(0, 3);
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
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Notre sélection de la semaine</h2>
          <HeroBanner properties={featuredProperties} />
        </section>

        {/* Live Properties Section */}
        <LiveSection properties={liveProperties} />

        {/* All Properties Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tous nos biens</h2>
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
            <PropertyList properties={allProperties} viewMode="list" />
          ) : (
            <PropertyMap properties={allProperties} />
          )}
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-accent rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">
              Vous êtes agent immobilier ou promoteur ?
            </h3>
            <p className="text-muted-foreground mb-4">
              Rejoignez notre plateforme et commencez à diffuser vos biens en direct
            </p>
            <Button>Commencer maintenant</Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
