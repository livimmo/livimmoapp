import { PropertyList } from "@/components/search/PropertyList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, User, Route } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  // Mock data for featured properties
  const featuredProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      title: "Villa Moderne avec Piscine",
      price: 2500000,
      location: "Marrakech",
      type: "Villa",
      surface: 350,
      rooms: 5,
      hasLive: true,
      tags: ["Coup de cœur", "Live"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      title: "Appartement Vue Mer",
      price: 1800000,
      location: "Tanger",
      type: "Appartement",
      surface: 120,
      rooms: 3,
      hasLive: false,
      tags: ["Nouveauté"]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      title: "Penthouse Luxueux",
      price: 3200000,
      location: "Casablanca",
      type: "Appartement",
      surface: 200,
      rooms: 4,
      hasLive: true,
      tags: ["Exclusivité", "Live"]
    }
  ];

  const liveProperties = featuredProperties.filter(prop => prop.hasLive);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">Livimmo</h1>
            <Route className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content with padding for header */}
      <main className="container mx-auto px-4 pt-20">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher par ville ou région..."
            className="pl-9"
          />
        </div>

        {/* Live Properties Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">En direct</h2>
            <Button variant="link" className="text-primary">
              Voir tout
            </Button>
          </div>
          <PropertyList properties={liveProperties} viewMode="carousel" />
        </section>

        {/* Featured Properties Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Biens en vedette</h2>
            <Button variant="link" className="text-primary">
              Voir tout
            </Button>
          </div>
          <PropertyList properties={featuredProperties} viewMode="list" />
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-accent rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">
              Vous êtes agent immobilier ?
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