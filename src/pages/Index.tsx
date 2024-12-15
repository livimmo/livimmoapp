import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Map as MapIcon, List } from "lucide-react";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
    coordinates: [33.5731, -7.6298], // Coordonnées pour Casablanca
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
    coordinates: [34.0209, -6.8416], // Coordonnées pour Rabat
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
    coordinates: [31.6295, -7.9811], // Coordonnées pour Marrakech
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
              <MapIcon className="w-4 h-4 mr-1" />
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
            <div className="h-[600px] rounded-lg overflow-hidden">
              <MapContainer
                center={[31.7917, -7.0926]} // Centre du Maroc
                zoom={6}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {properties.map((property) => (
                  <Marker 
                    key={property.id} 
                    position={property.coordinates as [number, number]}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold">{property.title}</h3>
                        <p className="text-sm text-gray-600">{property.location}</p>
                        <p className="text-sm font-medium">
                          {property.price.toLocaleString('fr-FR')} MAD
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
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