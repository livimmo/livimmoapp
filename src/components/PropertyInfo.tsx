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
  has_live?: boolean;
  live_date?: string | null;
  onJoinLive?: () => void;
  is_live_now?: boolean;
  remaining_seats?: number;
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
  is_live_now,
  remaining_seats,
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
        {has_live && onJoinLive && (
          <LiveButton
            id={id}
            title={title}
            liveDate={live_date}
            onJoinLive={onJoinLive}
            isLiveNow={is_live_now}
            remainingSeats={remaining_seats}
            isUserRegistered={isUserRegistered}
          />
        )}
      </div>
    </div>
  );
};