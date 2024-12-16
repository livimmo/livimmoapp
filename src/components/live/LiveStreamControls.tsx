import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LiveInfo } from "./LiveInfo";
import { type Property } from "@/types/property";

interface LiveStreamControlsProps {
  property: Property;
  onMakeOffer: () => void;
  showChat: boolean;
  setShowChat: (show: boolean) => void;
  isFavorite: boolean;
  handleToggleFavorite: () => void;
}

export const LiveStreamControls = ({
  property,
  onMakeOffer,
  showChat,
  setShowChat,
  isFavorite,
  handleToggleFavorite,
}: LiveStreamControlsProps) => {
  const { toast } = useToast();

  return (
    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
      <LiveInfo 
        property={property} 
        onMakeOffer={onMakeOffer}
      />
      <div className="flex flex-col gap-2 ml-4">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/75"
          onClick={() => setShowChat(!showChat)}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/75"
          onClick={handleToggleFavorite}
        >
          <ThumbsUp className={`h-5 w-5 ${isFavorite ? "text-primary" : ""}`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/75"
          onClick={() => {
            toast({
              title: "Visite programmée",
              description: "Nous vous contacterons pour confirmer la date",
            });
          }}
        >
          <Calendar className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};