import { Link } from "react-router-dom";
import { OfferDialog } from "./property/OfferDialog";
import { LiveButton } from "./property/LiveButton";

interface PropertyInfoProps {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  hasLive?: boolean;
  liveDate?: string | null;
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
  liveDate,
  onJoinLive,
  isLiveNow,
  remainingSeats,
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
      <div className="grid grid-cols-2 gap-2">
        <OfferDialog title={title} price={price} />
        {hasLive && onJoinLive && (
          <LiveButton
            id={id}
            title={title}
            liveDate={liveDate}
            onJoinLive={onJoinLive}
            isLiveNow={isLiveNow}
            remainingSeats={remainingSeats}
            isUserRegistered={isUserRegistered}
          />
        )}
      </div>
    </div>
  );
};