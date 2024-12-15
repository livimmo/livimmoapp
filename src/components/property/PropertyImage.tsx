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
  remainingSeats?: number;
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
  remainingSeats = 0,
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
            <>
              <Badge className="bg-primary/90 backdrop-blur-sm text-white">
                {new Date(liveDate).toLocaleDateString("fr-FR", {
                  weekday: 'long',
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Badge>
              {remainingSeats > 0 && (
                <Badge variant="secondary" className="backdrop-blur-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {remainingSeats} places disponibles
                </Badge>
              )}
            </>
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