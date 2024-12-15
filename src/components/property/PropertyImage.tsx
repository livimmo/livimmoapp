import { Link } from "react-router-dom";
import { ViewersCounter } from "./ViewersCounter";
import { Video, Calendar } from "lucide-react";
import { PropertyActions } from "./PropertyActions";
import { FavoriteButton } from "./FavoriteButton";
import { Badge } from "@/components/ui/badge";

interface PropertyImageProps {
  id: number;
  title: string;
  image: string;
  hasLive?: boolean;
  liveDate?: Date;
  viewers?: number;
  currentUrl: string;
}

export const PropertyImage = ({
  id,
  title,
  image,
  hasLive,
  liveDate,
  viewers = 0,
  currentUrl,
}: PropertyImageProps) => {
  return (
    <div className="relative">
      <Link to={`/property/${id}`}>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </Link>
      <div className="absolute top-2 left-2 flex flex-col gap-2">
        {hasLive && viewers > 0 && <ViewersCounter count={viewers} />}
        {hasLive && liveDate && (
          <Badge className="bg-primary/90 backdrop-blur-sm text-white">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(liveDate).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Badge>
        )}
      </div>
      <div className="absolute top-2 right-2 flex gap-2">
        <FavoriteButton propertyId={id} title={title} />
        {hasLive && (
          <div className="p-2 bg-[#ea384c] rounded-full shadow-md">
            <Video className="h-5 w-5 text-white" />
          </div>
        )}
        <PropertyActions title={title} currentUrl={currentUrl} />
      </div>
    </div>
  );
};