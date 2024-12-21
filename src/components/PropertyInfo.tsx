import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LiveButton } from "./property/LiveButton";
import { MapPin, Home, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyInfoProps {
  id: number;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  hasLive?: boolean;
  liveDate?: Date;
  onJoinLive?: () => void;
  isLiveNow?: boolean;
  remainingSeats?: number;
  isUserRegistered?: boolean;
}

export const PropertyInfo = ({
  id,
  title,
  price,
  location,
  type,
  surface,
  rooms,
  hasLive,
  onJoinLive,
  isLiveNow,
  isUserRegistered,
}: PropertyInfoProps) => {
  // Extraire le quartier de la localisation
  const [city, district] = location.split(", ");

  return (
    <div className="p-4">
      <Link to={`/property/${id}`}>
        <h3 className={cn(
          "font-semibold text-lg mb-2 line-clamp-2 transition-colors",
          isLiveNow ? "text-white hover:text-emerald-300" : "group-hover:text-primary"
        )}>
          {title}
        </h3>
      </Link>
      <p className={cn(
        "font-bold text-xl mb-3",
        isLiveNow ? "text-white" : "text-primary"
      )}>
        {price.toLocaleString()} DH
      </p>
      <div className="space-y-2 mb-4">
        <div className={cn(
          "flex items-center text-sm gap-2",
          isLiveNow ? "text-white/80" : "text-gray-500"
        )}>
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <div className="flex flex-col">
            <span>{city}</span>
            {district && (
              <span className={cn(
                "text-xs",
                isLiveNow ? "text-white/60" : "text-gray-400"
              )}>
                {district}
              </span>
            )}
          </div>
        </div>
        <div className={cn(
          "flex items-center text-sm gap-2",
          isLiveNow ? "text-white/80" : "text-gray-500"
        )}>
          <Home className="w-4 h-4 flex-shrink-0" />
          <span>{type}</span>
        </div>
        <div className={cn(
          "flex items-center text-sm gap-2",
          isLiveNow ? "text-white/80" : "text-gray-500"
        )}>
          <Maximize2 className="w-4 h-4 flex-shrink-0" />
          <span>{surface} m² • {rooms} pièces</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {hasLive && onJoinLive && (
          <LiveButton
            id={id}
            title={title}
            onJoinLive={onJoinLive}
            isLiveNow={isLiveNow}
            isUserRegistered={isUserRegistered}
          />
        )}
      </div>
    </div>
  );
};