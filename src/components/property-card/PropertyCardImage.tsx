import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FavoriteButton } from "../property/FavoriteButton";
import { PropertyActions } from "../property/PropertyActions";
import { VirtualTourBadge } from "../property/VirtualTourBadge";
import { VirtualTourButton } from "../property/VirtualTourButton";
import { OffersCounter } from "../property/OffersCounter";

interface PropertyCardImageProps {
  id: string;
  title: string;
  image: string;
  hasLive?: boolean;
  liveDate?: string | null;
  viewers?: number;
  currentUrl?: string;
  isLiveNow?: boolean;
  remainingSeats?: number;
  isUserRegistered?: boolean;
  offers?: number;
  virtualTour?: {
    enabled: boolean;
    url?: string;
    platform?: "matterport" | "klapty";
    type: "360" | "video" | "live";
  } | null;
  tags?: string[];
  onVirtualTourClick?: () => void;
  onUnauthorized?: () => void;
}

export const PropertyCardImage = ({
  id,
  title,
  image,
  hasLive,
  liveDate,
  viewers = 0,
  currentUrl,
  isLiveNow,
  isUserRegistered,
  remainingSeats,
  offers,
  virtualTour,
  tags,
  onVirtualTourClick,
  onUnauthorized,
}: PropertyCardImageProps) => {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
      <Link to={`/property/${id}`}>
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <FavoriteButton 
          propertyId={id} 
          title={title}
          onUnauthorized={onUnauthorized}
        />
        {currentUrl && <PropertyActions title={title} currentUrl={currentUrl} />}
      </div>

      {offers > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <OffersCounter offers={offers} />
        </div>
      )}

      <div className="absolute top-2 left-2 right-14 z-10">
        <div className="flex flex-wrap gap-1">
          {!hasLive && (
            <Badge variant="destructive" className="bg-[#ea384c]/90 backdrop-blur-sm text-white font-semibold shadow-sm">
              Vendu
            </Badge>
          )}
          {virtualTour?.enabled && <VirtualTourBadge />}
          {tags?.map((tag) => (
            <Badge
              key={tag}
              variant={
                tag === "Coup de fusil"
                  ? "destructive"
                  : tag === "Nouveauté"
                  ? "default"
                  : "secondary"
              }
              className={cn(
                "backdrop-blur-sm font-semibold shadow-sm whitespace-nowrap",
                tag === "Coup de fusil" 
                  ? "bg-[#ea384c]/90 text-white"
                  : tag === "Nouveauté"
                  ? "bg-[#0EA5E9]/90 text-white"
                  : "bg-white/90 text-gray-900"
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>
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
            </>
          ) : (
            liveDate && (
              <>
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
                {remainingSeats && remainingSeats > 0 && (
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                    <Users className="mr-1 h-4 w-4" />
                    {remainingSeats} places restantes
                  </Badge>
                )}
              </>
            )
          )}
        </div>
      )}

      {virtualTour?.enabled && (
        <div className="absolute inset-0 flex items-center justify-center">
          <VirtualTourButton 
            onClick={onVirtualTourClick}
            className="!px-2 md:!px-4"
          />
        </div>
      )}
    </div>
  );
};