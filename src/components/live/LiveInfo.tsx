import { Button } from "@/components/ui/button";
import { type Property } from "@/types/property";
import { Users, Heart } from "lucide-react";
import { useState } from "react";
import { LiveOfferDialog } from "./LiveOfferDialog";
import { SubscribeButton } from "../agent/SubscribeButton";
import { useToast } from "@/hooks/use-toast";
import { AgentRating } from "./AgentRating";

interface LiveInfoProps {
  property: Property;
  onMakeOffer: () => void;
  viewerCount?: number;
  showRating?: boolean;
}

export const LiveInfo = ({ 
  property, 
  viewerCount = 0, 
  showRating = false 
}: LiveInfoProps) => {
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: `${property.title} a été ${isFavorite ? "retiré de" : "ajouté à"} vos favoris.`,
    });
  };

  const handleRate = (rating: number) => {
    // Ici vous pouvez ajouter la logique pour sauvegarder la note dans votre backend
    console.log(`Agent ${property.agent.name} rated: ${rating}/5`);
  };

  return (
    <div className="space-y-4 p-4 bg-black/50 rounded-lg text-white max-w-md">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            LIVE
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white hover:bg-black/75"
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
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

        {showRating && (
          <AgentRating 
            agentName={property.agent.name} 
            onRate={handleRate}
          />
        )}
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