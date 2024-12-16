import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FavoriteButton } from "@/components/property/FavoriteButton";
import { LiveCarousel } from "./LiveCarousel";
import { type Live } from "@/types/live";

interface LiveStreamProps {
  videoId: string;
  currentLiveId: number;
  otherLives: Live[];
  onLiveChange: (id: number) => void;
}

export const LiveStream = ({ 
  videoId, 
  currentLiveId,
  otherLives,
  onLiveChange 
}: LiveStreamProps) => {
  const [showCarousel, setShowCarousel] = useState(true);

  return (
    <div className="relative w-full h-full bg-black">
      <div className="absolute top-4 left-4 z-10">
        <FavoriteButton 
          propertyId={currentLiveId}
          title="Villa Moderne avec Piscine"
        />
      </div>

      {showCarousel && (
        <div className="absolute top-0 left-0 right-0 z-10">
          <LiveCarousel 
            currentLiveId={currentLiveId}
            lives={otherLives}
            onLiveChange={onLiveChange}
          />
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowCarousel(!showCarousel)}
        className="absolute top-4 right-4 z-20 bg-black/50 text-white hover:bg-black/75"
      >
        {showCarousel ? (
          <>
            <ChevronUp className="h-4 w-4 mr-1" />
            Masquer
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4 mr-1" />
            Autres lives
          </>
        )}
      </Button>

      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};