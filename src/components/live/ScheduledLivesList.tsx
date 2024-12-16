import { LiveCard } from "./LiveCard";
import { PropertyMap } from "../search/PropertyMap";
import { LiveEvent } from "@/types/live";
import { Property } from "@/types/property";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateMockCoordinates } from "@/data/mockProperties";

interface ScheduledLivesListProps {
  lives: LiveEvent[];
}

export const ScheduledLivesList = ({ lives }: ScheduledLivesListProps) => {
  const locations: Property[] = lives.map(live => ({
    id: live.id,
    title: live.title,
    location: live.location,
    price: typeof live.price === 'string' ? parseInt(live.price, 10) : live.price,
    type: live.type,
    surface: 0,
    rooms: 0,
    bathrooms: 0,
    description: live.description || "",
    features: [],
    images: [live.thumbnail],
    agent: {
      name: live.agent,
      image: "/placeholder.svg",
      phone: "N/A",
      email: "N/A"
    },
    coordinates: generateMockCoordinates(live.location),
    transactionType: Math.random() > 0.5 ? "Vente" : "Location"
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lives.map((live) => (
        <LiveCard key={live.id} live={live} />
      ))}
    </div>
  );
};