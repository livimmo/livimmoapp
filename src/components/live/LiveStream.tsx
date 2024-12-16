import { Video } from "lucide-react";
import { FavoriteButton } from "@/components/property/FavoriteButton";

interface LiveStreamProps {
  videoId: string;
  propertyId: number;
  propertyTitle: string;
}

export const LiveStream = ({ videoId, propertyId, propertyTitle }: LiveStreamProps) => {
  return (
    <div className="absolute inset-0 bg-black">
      <div className="absolute top-4 left-4 z-10">
        <FavoriteButton 
          propertyId={propertyId}
          title={propertyTitle}
        />
      </div>
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};