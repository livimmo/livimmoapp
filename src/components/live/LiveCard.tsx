import { type LiveEvent } from "@/types/live";
import { PropertyCard } from "@/components/PropertyCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { LiveStream } from "./LiveStream";

interface LiveCardProps {
  live: LiveEvent;
}

export const LiveCard = ({ live }: LiveCardProps) => {
  const [showLive, setShowLive] = useState(false);

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
  };

  return (
    <>
      <div onClick={() => setShowLive(true)}>
        <PropertyCard {...propertyData} />
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