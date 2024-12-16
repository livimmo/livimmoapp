import { PropertyCard } from "@/components/PropertyCard";
import { liveStreams } from "@/data/mockLives";
import { type Property } from "@/types/property";

export const LiveSection = () => {
  // Convertir les lives en format Property pour les afficher avec PropertyCard
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
      lat: 0,
      lng: 0,
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
      <h2 className="text-lg font-semibold mb-4">Lives en cours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {liveProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </section>
  );
};