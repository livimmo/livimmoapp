import { type LiveEvent } from "@/types/live";
import { PropertyCard } from "@/components/PropertyCard";

interface LiveCardProps {
  live: LiveEvent;
}

export const LiveCard = ({ live }: LiveCardProps) => {
  const propertyData = {
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
      id: `agent-${live.id}`,
      name: live.agent,
      image: "",
      phone: "",
      email: "",
      isVerified: false,
    },
    coordinates: {
      lat: 0,
      lng: 0,
    },
    viewers: live.viewers,
    isLiveNow: live.status === "live",
    remainingSeats: live.availableSeats,
    isUserRegistered: false,
  };

  return <PropertyCard {...propertyData} />;
};