import { useState } from "react";
import { LiveCard } from "@/components/live/LiveCard";
import { LiveGoogleMap } from "@/components/live/LiveGoogleMap";
import { ReplayCard } from "@/components/live/ReplayCard";
import { liveStreams } from "@/data/mockLives";
import { type Property } from "@/types/property";

export const LiveSection = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Séparer les lives en cours des replays
  const currentLives = liveStreams.filter(live => live.status === "live");
  const replayLives = liveStreams.filter(live => live.status === "replay");

  // Convertir les lives en format Property pour la carte
  const convertToProperty = (live: any): Property => ({
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
    isLiveNow: live.status === "live",
    viewers: live.viewers,
    remainingSeats: live.availableSeats,
    transactionType: Math.random() > 0.5 ? "Vente" : "Location",
  });

  const currentProperties = currentLives.map(convertToProperty);
  const replayProperties = replayLives.map(convertToProperty);

  if (currentLives.length === 0 && replayLives.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tous nos lives</h2>
        <p className="text-muted-foreground text-center py-8">
          Aucun live disponible pour le moment
        </p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="space-y-4">
        {viewMode === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentLives.map((live) => (
              <LiveCard key={live.id} live={live} />
            ))}
            {replayLives.map((live) => (
              <ReplayCard key={live.id} live={live} />
            ))}
          </div>
        ) : (
          <div className="h-[500px] rounded-lg overflow-hidden">
            <LiveGoogleMap properties={[...currentProperties, ...replayProperties]} />
          </div>
        )}
      </div>
    </section>
  );
};