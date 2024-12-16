import { Button } from "@/components/ui/button";
import { type Property } from "@/types/property";
import { Users } from "lucide-react";
import { useState } from "react";
import { LiveOfferDialog } from "./LiveOfferDialog";
import { SubscribeButton } from "../agent/SubscribeButton";

interface LiveInfoProps {
  property: Property;
  onMakeOffer: () => void;
  viewerCount?: number;
}

export const LiveInfo = ({ property, viewerCount = 0 }: LiveInfoProps) => {
  const [showOfferDialog, setShowOfferDialog] = useState(false);

  return (
    <div className="space-y-4 p-4 bg-black/50 rounded-lg text-white max-w-md">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            LIVE
          </div>
        </div>
        <h2 className="text-lg font-semibold">{property.title}</h2>
        <p className="text-sm opacity-75">{property.location}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={property.agent.image}
                alt={property.agent.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">{property.agent.name}</span>
            </div>
            <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded">
              <Users className="w-4 h-4" />
              <span className="text-sm">{viewerCount}</span>
            </div>
          </div>
          <Button 
            onClick={() => setShowOfferDialog(true)} 
            variant="default" 
            size="sm"
          >
            Proposer un prix
          </Button>
        </div>

        <SubscribeButton 
          agentId={property.agent.id || "1"} 
          initialSubscriberCount={125}
        />
      </div>

      <LiveOfferDialog
        title={property.title}
        price={property.price}
        isOpen={showOfferDialog}
        onClose={() => setShowOfferDialog(false)}
      />
    </div>
  );
};