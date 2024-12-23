import { useState } from "react";
import { LiveCard } from "@/components/live/LiveCard";
import { ReplayCard } from "@/components/live/ReplayCard";
import { liveStreams } from "@/data/mockLives";
import { type Property } from "@/types/property";
import { PropertyViewToggle } from "@/components/properties/PropertyViewToggle";
import { PropertyMapView } from "@/components/map/PropertyMapView";
import { PropertyListView } from "@/components/properties/PropertyListView";

export const LiveSection = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Separate current lives from replays
  const currentLives = liveStreams.filter(live => live.status === "live");
  const replayLives = liveStreams.filter(live => live.status === "replay");

  // Convert lives to Property format for the map
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
    has_live: true,
    live_date: live.date,
    agent_id: "",
    coordinates: {
      lat: 31.7917 + Math.random() * 2 - 1,
      lng: -7.0926 + Math.random() * 2 - 1,
    },
    is_live_now: live.status === "live",
    viewers: live.viewers,
    remaining_seats: live.availableSeats,
    transaction_type: Math.random() > 0.5 ? "Vente" : "Location",
    is_replay: false,
    has_scheduled_live: false,
    virtual_tour: null,
    private_notes: null,
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [],
  });

  const properties = [...currentLives, ...replayLives].map(convertToProperty);

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tous nos lives</h2>
        <PropertyViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

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
        <PropertyMapView properties={properties} />
      )}
    </section>
  );
};