import { Video } from "lucide-react";
import { LiveCarousel } from "./LiveCarousel";
import { FavoriteButton } from "../property/FavoriteButton";
import { useState } from "react";
import { LiveEvent } from "@/types/live";

interface LiveStreamProps {
  videoId: string;
  currentLiveId: number;
  otherLives: LiveEvent[];
  onLiveChange: (liveId: number) => void;
}

export const LiveStream = ({ videoId, currentLiveId, otherLives, onLiveChange }: LiveStreamProps) => {
  const [showCarousel, setShowCarousel] = useState(true);

  return (
    <div className="absolute inset-0 bg-black">
      {showCarousel && otherLives.length > 0 && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent">
          <LiveCarousel 
            lives={otherLives}
            currentLiveId={currentLiveId}
            onLiveSelect={onLiveChange}
            onClose={() => setShowCarousel(false)}
          />
        </div>
      )}
      
      <div className="absolute top-4 left-4 z-20">
        <FavoriteButton propertyId={currentLiveId} title="" variant="default" />
      </div>
      
      {!showCarousel && (
        <button
          onClick={() => setShowCarousel(true)}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
        >
          <Video className="w-5 h-5" />
        </button>
      )}

      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};