import { LiveCard } from "./LiveCard";
import { PropertyMap } from "../search/PropertyMap";
import { LiveEvent } from "@/types/live";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Property } from "@/types/property";

interface ScheduledLivesListProps {
  lives: LiveEvent[];
}

export const ScheduledLivesList = ({ lives }: ScheduledLivesListProps) => {
  const locations: Property[] = lives.map(live => ({
    id: live.id,
    title: live.title,
    location: live.location,
    price: live.price,
    type: live.type,
    surface: "N/A",
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
    coordinates: {
      lat: 31.7917 + Math.random() * 2,
      lng: -7.0926 + Math.random() * 2
    }
  }));

  return (
    <Tabs defaultValue="grid" className="w-full">
      <TabsList className="w-full mb-4">
        <TabsTrigger value="grid" className="flex-1">Grille</TabsTrigger>
        <TabsTrigger value="map" className="flex-1">Carte</TabsTrigger>
      </TabsList>
      
      <TabsContent value="grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lives.map((live) => (
            <LiveCard key={live.id} live={live} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="map">
        <PropertyMap properties={locations} />
      </TabsContent>
    </Tabs>
  );
};