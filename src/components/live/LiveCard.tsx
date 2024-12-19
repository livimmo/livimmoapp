import { type LiveEvent } from "@/types/live";
import { PropertyCard } from "@/components/PropertyCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { LiveStream } from "./LiveStream";
import { Radio } from "lucide-react";
import { createDefaultProperty } from "@/types/property";

interface LiveCardProps {
  live: LiveEvent;
}

export const LiveCard = ({ live }: LiveCardProps) => {
  const [showLive, setShowLive] = useState(false);

  const propertyData = createDefaultProperty({
    id: live.id,
    title: live.title,
    price: typeof live.price === 'string' ? parseInt(live.price.replace(/[^\d]/g, "")) : live.price,
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
      id: live.agentId || Math.floor(Math.random() * 1000),
      name: live.agent,
      image: "https://i.pravatar.cc/150?u=" + live.agent.toLowerCase().replace(/\s/g, ''),
      phone: "",
      email: "",
      company: "Livimmo",
      verified: Math.random() > 0.5,
    },
    coordinates: {
      lat: 0,
      lng: 0,
    },
    viewers: live.viewers,
    isLiveNow: live.status === "live",
    remainingSeats: live.availableSeats,
    isUserRegistered: false,
    transactionType: "Vente" as const,
  });

  return (
    <>
      <div onClick={() => setShowLive(true)} className="cursor-pointer">
        <PropertyCard 
          {...propertyData}
          customButton={
            <button 
              className="w-full bg-[#ea384c] hover:bg-[#ea384c]/90 text-white font-medium px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              Live à venir
            </button>
          }
        />
      </div>

      <Dialog open={showLive} onOpenChange={setShowLive}>
        <DialogContent className="max-w-6xl h-[80vh] p-0">
          <LiveStream 
            videoId="n3wtxcO_0GQ"
            currentLiveId={live.id}
            otherLives={[]}
            onLiveChange={() => {}}
            isReplay={false}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};