import { Link } from "react-router-dom";
import { ViewersCounter } from "./ViewersCounter";
import { Video } from "lucide-react";
import { PropertyActions } from "./PropertyActions";
import { FavoriteButton } from "./FavoriteButton";

interface PropertyImageProps {
  id: number;
  title: string;
  image: string;
  hasLive?: boolean;
  viewers?: number;
  currentUrl: string;
}

export const PropertyImage = ({
  id,
  title,
  image,
  hasLive,
  viewers = 0,
  currentUrl,
}: PropertyImageProps) => {
  return (
    <div className="relative">
      <Link to={`/property/${id}`}>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </Link>
      <div className="absolute top-2 left-2 flex gap-2">
        {hasLive && viewers > 0 && <ViewersCounter count={viewers} />}
      </div>
      <div className="absolute top-2 right-2 flex gap-2">
        <FavoriteButton propertyId={id} title={title} />
        {hasLive && (
          <div className="p-2 bg-[#ea384c] rounded-full shadow-md">
            <Video className="w-5 h-5 text-white" />
          </div>
        )}
        <PropertyActions title={title} currentUrl={currentUrl} />
      </div>
    </div>
  );
};