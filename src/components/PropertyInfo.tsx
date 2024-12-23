import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LiveButton } from "./property/LiveButton";
import { MapPin, Home, Maximize2 } from "lucide-react";

interface PropertyInfoProps {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  has_live?: boolean;
  live_date?: string | null;
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
  has_live,
  live_date,
  onJoinLive,
  isLiveNow,
  remainingSeats,
  isUserRegistered,
}: PropertyInfoProps) => {
  // Extract city and district from location
  const [city, district] = location.split(", ");

  return (
    <div className="p-4">
      <Link to={`/property/${id}`}>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
      </Link>
      <p className="text-primary font-bold text-xl mb-3">
        {price.toLocaleString()} DH
      </p>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-500 text-sm gap-2">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <div className="flex flex-col">
            <span>{city}</span>
            {district && <span className="text-xs text-gray-400">{district}</span>}
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-sm gap-2">
          <Home className="w-4 h-4 flex-shrink-0" />
          <span>{type}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm gap-2">
          <Maximize2 className="w-4 h-4 flex-shrink-0" />
          <span>{surface} m² • {rooms} pièces</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {has_live && onJoinLive && (
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