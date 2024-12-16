import { useState, useEffect } from "react";
import { Map, List, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { LiveGoogleMap } from "@/components/live/LiveGoogleMap";
import { liveStreams } from "@/data/mockLives";
import { type Property } from "@/types/property";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const LiveSection = () => {
  const [viewMode, setViewMode] = useState<"list" | "map" | "hybrid">("hybrid");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simuler la détection d'un nouveau live
    if (liveStreams.length > 0) {
      const latestLive = liveStreams[0];
      toast({
        title: "🔴 Nouveau live en cours !",
        description: (
          <div className="mt-2 space-y-2">
            <p>"{latestLive.title}" vient de commencer avec {latestLive.agent}</p>
            <Button 
              onClick={() => navigate(`/live/${latestLive.id}`)}
              className="w-full"
              variant="default"
            >
              <Video className="w-4 h-4 mr-2" />
              Rejoindre le live maintenant
            </Button>
          </div>
        ),
        variant: "default",
        className: "bg-red-500 text-white",
        duration: 10000,
      });
    }
  }, [toast, navigate]);

  const liveProperties: Property[] = liveStreams.map((live) => ({
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
  }));

  if (liveProperties.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Lives en cours</h2>
        <p className="text-muted-foreground text-center py-8">
          Aucun live en cours pour le moment
        </p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Lives en cours</h2>
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
            variant={viewMode === "hybrid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("hybrid")}
          >
            <List className="h-4 w-4 mr-2" />
            Hybride
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

      {viewMode === "list" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      )}

      {viewMode === "map" && (
        <div className="h-[500px] rounded-lg overflow-hidden">
          <LiveGoogleMap properties={liveProperties} />
        </div>
      )}

      {viewMode === "hybrid" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[500px] rounded-lg overflow-hidden">
            <LiveGoogleMap properties={liveProperties} />
          </div>
          <div className="space-y-4 overflow-auto max-h-[500px] pr-2">
            {liveProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};