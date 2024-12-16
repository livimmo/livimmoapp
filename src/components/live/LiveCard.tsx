import { type LiveEvent } from "@/types/live";
import { PropertyCard } from "@/components/PropertyCard";

interface LiveCardProps {
  title: string;
  description?: string;
  thumbnail: string;
  agent: string;
  agentId?: number;
  location: string;
  type: string;
  price: string;
  status: 'scheduled' | 'live' | 'ended' | 'replay';
  date: Date;
  availableSeats: number;
  viewers?: number;
  id: number;
}

export const LiveCard = (props: LiveCardProps) => {
  const propertyData = {
    id: props.id,
    title: props.title,
    price: parseInt(props.price.replace(/[^\d]/g, "")),
    location: props.location,
    type: props.type,
    surface: 0,
    rooms: 0,
    bathrooms: 0,
    description: props.description || "",
    features: [],
    images: [props.thumbnail],
    hasLive: true,
    liveDate: props.date,
    agent: {
      id: props.agentId || Math.floor(Math.random() * 1000),
      name: props.agent,
      image: "https://i.pravatar.cc/150?u=" + props.agent.toLowerCase().replace(/\s/g, ''),
      phone: "",
      email: "",
      company: "Livimmo",
      verified: Math.random() > 0.5,
    },
    coordinates: {
      lat: 0,
      lng: 0,
    },
    viewers: props.viewers,
    isLiveNow: props.status === "live",
    remainingSeats: props.availableSeats,
    isUserRegistered: false,
    transactionType: "Vente" as const,
  };

  return <PropertyCard {...propertyData} />;
};