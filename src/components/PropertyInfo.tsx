import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LiveButton } from "./property/LiveButton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PropertyInfoProps {
  id: number;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  description: string;
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
  description,
  hasLive,
  onJoinLive,
  isLiveNow,
  isUserRegistered,
}: PropertyInfoProps) => {
  return (
    <div className="p-4">
      <Link to={`/property/${id}`}>
        <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
          {title}
        </h3>
      </Link>
      <p className="text-primary font-bold text-xl mb-2">
        {price.toLocaleString()} DH
      </p>
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <span>{location}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>{type}</span>
        <span>{surface} m²</span>
        <span>{rooms} pièces</span>
      </div>
      <ScrollArea className="h-[80px] mb-4 rounded-md">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </ScrollArea>
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