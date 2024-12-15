import { Link } from "react-router-dom";
import { ViewersCounter } from "./ViewersCounter";
import { Video, Calendar, CircleDot } from "lucide-react";
import { PropertyActions } from "./PropertyActions";
import { FavoriteButton } from "./FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PropertyImageProps {
  id: number;
  title: string;
  image: string;
  hasLive?: boolean;
  liveDate?: Date;
  viewers?: number;
  currentUrl: string;
  isLiveNow?: boolean;
}

export const PropertyImage = ({
  id,
  title,
  image,
  hasLive,
  liveDate,
  viewers = 0,
  currentUrl,
  isLiveNow,
}: PropertyImageProps) => {
  return (
    <div className="relative">
      <Link to={`/property/${id}`}>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </Link>
      <div className="absolute top-2 left-2 flex flex-col gap-2">
        {hasLive && (
          <>
            {isLiveNow ? (
              <Badge className="bg-[#ea384c]/90 backdrop-blur-sm text-white animate-pulse">
                <CircleDot className="w-4 h-4 mr-1" />
                Live en cours
              </Badge>
            ) : (
              liveDate && (
                <Badge className="bg-primary/90 backdrop-blur-sm text-white">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(liveDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Badge>
              )
            )}
            {viewers > 0 && <ViewersCounter count={viewers} />}
          </>
        )}
      </div>
      <div className="absolute top-2 right-2 flex gap-2">
        <FavoriteButton propertyId={id} title={title} />
        {hasLive && (
          <div className={cn(
            "p-2 rounded-full shadow-md",
            isLiveNow ? "bg-[#ea384c]" : "bg-primary"
          )}>
            <Video className="h-5 w-5 text-white" />
          </div>
        )}
        <PropertyActions title={title} currentUrl={currentUrl} />
      </div>
    </div>
  );
};