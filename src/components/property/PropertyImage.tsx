import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Users, CircleDot } from "lucide-react";
import { ViewersCounter } from "./ViewersCounter";
import { LiveRegistrationStatus } from "./LiveRegistrationStatus";

interface PropertyImageProps {
  id: number;
  title: string;
  image: string;
  hasLive?: boolean;
  liveDate?: Date;
  viewers?: number;
  currentUrl: string;
  isLiveNow?: boolean;
  isUserRegistered?: boolean;
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
  isUserRegistered = false,
}: PropertyImageProps) => {
  return (
    <div className="relative aspect-[4/3]">
      <Link to={`/property/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </Link>

      {hasLive && liveDate && (
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isLiveNow ? (
            <>
              <Badge className="bg-[#ea384c]/90 backdrop-blur-sm text-white animate-pulse">
                <CircleDot className="w-4 h-4 mr-1" />
                Live en cours
              </Badge>
              {viewers > 0 && <ViewersCounter count={viewers} />}
            </>
          ) : (
            <Badge className="bg-primary/90 backdrop-blur-sm text-white">
              Live le {new Date(liveDate).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Badge>
          )}
        </div>
      )}

      {hasLive && liveDate && (
        <LiveRegistrationStatus 
          isRegistered={isUserRegistered} 
          liveDate={liveDate} 
        />
      )}
    </div>
  );
};