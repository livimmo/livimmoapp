import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/property/FavoriteButton";
import { type LiveEvent } from "@/types/live";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface LiveStreamProps {
  videoId: string;
  currentLiveId: number;
  otherLives: LiveEvent[];
  onLiveChange: (id: number) => void;
}

export const LiveStream = ({ 
  videoId, 
  currentLiveId,
  otherLives,
  onLiveChange 
}: LiveStreamProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full h-full bg-black">
      {isMobile && (
        <div className="absolute top-4 left-0 right-0 z-20 flex items-center justify-between px-4">
          <FavoriteButton 
            propertyId={currentLiveId}
            title="Villa Moderne avec Piscine"
            className="bg-black/50 backdrop-blur-sm hover:bg-black/75"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="bg-black/50 text-white hover:bg-black/75 backdrop-blur-sm"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {!isMobile && (
        <div className="absolute top-4 right-4 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="bg-black/50 text-white hover:bg-black/75"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};