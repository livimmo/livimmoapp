import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/property/FavoriteButton";
import { LiveCarousel } from "./LiveCarousel";
import { type LiveEvent } from "@/types/live";
import { Badge } from "@/components/ui/badge";

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
            onLiveSelect={onLiveChange}
            onClose={() => setShowCarousel(false)}
          />
        </div>
      )}

      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCarousel(!showCarousel)}
          className="bg-black/50 text-white hover:bg-black/75 relative"
        >
          <svg 
            className="h-4 w-4 mr-1" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M17 10l2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6l2 2h4Z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
          {showCarousel ? "Masquer" : "Autres lives"}
          <Badge 
            variant="default" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#ea384c]"
          >
            {otherLives.length}
          </Badge>
        </Button>
      </div>

      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};