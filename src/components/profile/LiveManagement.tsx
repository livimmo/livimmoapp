import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddLiveDialog } from "@/components/AddLiveDialog";
import { Video } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { type Property } from "@/types/property";

export const LiveManagement = () => {
  // Mock data - à remplacer par des vraies données
  const [scheduledLives] = useState<Property[]>([
    {
      id: 1,
      title: "Visite Villa Moderne Casablanca",
      price: 2500000,
      location: "Casablanca",
      type: "Villa",
      surface: 250,
      rooms: 5,
      bathrooms: 3,
      description: "Magnifique villa moderne",
      features: [],
      images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"],
      hasLive: true,
      liveDate: new Date("2024-03-20T14:00:00"),
      agent: {
        name: "John Doe",
        image: "",
        phone: "",
        email: "",
      },
      coordinates: {
        lat: 33.5731104,
        lng: -7.5898434,
      },
      viewers: 12,
      isLiveNow: false,
      remainingSeats: 15,
    },
    {
      id: 2,
      title: "Appartement Vue Mer - Tanger",
      price: 1800000,
      location: "Tanger",
      type: "Appartement",
      surface: 120,
      rooms: 3,
      bathrooms: 2,
      description: "Superbe appartement vue mer",
      features: [],
      images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"],
      hasLive: true,
      liveDate: new Date("2024-03-25T16:30:00"),
      agent: {
        name: "Jane Smith",
        image: "",
        phone: "",
        email: "",
      },
      coordinates: {
        lat: 35.7595,
        lng: -5.8340,
      },
      viewers: 8,
      isLiveNow: false,
      remainingSeats: 20,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Gestion des Lives</h3>
        <AddLiveDialog />
      </div>

      <div className="space-y-4">
        {scheduledLives.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Video className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>Aucun live programmé</p>
            <p className="text-sm">Commencez par ajouter votre premier live</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scheduledLives.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};