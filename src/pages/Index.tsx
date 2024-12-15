import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Map, List } from "lucide-react";
import { useState } from "react";

const properties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80",
    title: "Villa Moderne avec Piscine",
    price: 2500000,
    location: "Casablanca - Anfa",
    type: "Villa",
    surface: 300,
    rooms: 5,
    hasLive: true,
    liveDate: new Date(2024, 3, 15, 14, 30),
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80",
    title: "Appartement Vue Mer",
    price: 1800000,
    location: "Rabat - Hassan",
    type: "Appartement",
    surface: 120,
    rooms: 3,
    hasLive: false,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    title: "Duplex de Luxe",
    price: 3200000,
    location: "Marrakech - Guéliz",
    type: "Duplex",
    surface: 200,
    rooms: 4,
    hasLive: true,
    liveDate: new Date(2024, 3, 18, 16, 0),
  },
];

const Index = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  return (
    <div className="pb-20">
      <header className="bg-white shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Découvrez nos biens</h1>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4 mr-1" />
              Liste
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
            >
              <Map className="w-4 h-4 mr-1" />
              Carte
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4">
        {viewMode === "list" ? (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Biens en vedette</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-8">
            <div className="bg-accent rounded-lg p-4">
              <p className="text-center text-gray-500">
                La vue carte sera bientôt disponible
              </p>
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-semibold mb-4">Prochains Lives</h2>
          <div className="space-y-4">
            {properties
              .filter((property) => property.hasLive)
              .map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg shadow-sm p-4 space-y-2"
                >
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm text-gray-500">
                    {property.liveDate?.toLocaleString()}
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Rejoindre le live
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;