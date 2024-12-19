import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LiveOfferDialog } from "./LiveOfferDialog";
import { MessageSquare, Heart } from "lucide-react";
import { type Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LiveInfoProps {
  property: Property;
  onMakeOffer: () => void;
  viewerCount: number;
  onToggleChat: () => void;
  isReplay?: boolean;
}

export const LiveInfo = ({
  property,
  viewerCount,
  onToggleChat,
  isReplay = false,
}: LiveInfoProps) => {
  const [showOfferDialog, setShowOfferDialog] = useState(false);

  return (
    <div className="bg-black/80 backdrop-blur-sm text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
          <p className="text-sm text-gray-300">{property.location}</p>
          <p className="text-lg font-bold mt-1">
            {property.price.toLocaleString()} DH
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn(
              "bg-white/10 text-white hover:bg-white/20 transition-colors",
              "flex items-center gap-1.5"
            )}
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {viewerCount} spectateurs
          </Badge>

          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 border-0 hover:bg-white/20"
            onClick={onToggleChat}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 border-0 hover:bg-white/20"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          className="flex-1"
          onClick={() => setShowOfferDialog(true)}
        >
          Faire une offre
        </Button>
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
