import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";
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
  currentUrl?: string;
  isLiveNow?: boolean;
  remainingSeats?: number;
  isUserRegistered?: boolean;
}

export const PropertyImage = ({
  id,
  title,
  image,
  hasLive,
  liveDate,
  viewers = 0,
  isLiveNow,
  remainingSeats,
  isUserRegistered,
}: PropertyImageProps) => {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
      <Link to={`/property/${id}`}>
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </Link>

      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton propertyId={id} title={title} />
      </div>

      {hasLive && (
        <div className="absolute bottom-2 left-2 flex flex-col gap-1">
          {isLiveNow ? (
            <>
              <Badge
                variant="default"
                className={cn(
                  "bg-[#ea384c]/90 text-white backdrop-blur-sm animate-pulse",
                  isUserRegistered && "bg-green-500/90"
                )}
              >
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-white" />
                {isUserRegistered ? "Inscrit" : "Live en cours"}
              </Badge>
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                <Users className="mr-1 h-4 w-4" />
                {viewers} spectateurs
              </Badge>
              {!isUserRegistered && remainingSeats && remainingSeats > 0 && (
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                  {remainingSeats} places restantes
                </Badge>
              )}
            </>
          ) : (
            liveDate && (
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                <Clock className="mr-1 h-4 w-4" />
                {new Date(liveDate).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Badge>
            )
          )}
        </div>
      )}
    </div>
  );
};