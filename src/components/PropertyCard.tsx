import { Video } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { type Property } from "@/types/property";
import { ViewersCounter } from "./property/ViewersCounter";
import { PropertyActions } from "./property/PropertyActions";
import { OfferDialog } from "./property/OfferDialog";
import { LiveButton } from "./property/LiveButton";

type PropertyCardProps = Property & {
  viewers?: number;
};

export const PropertyCard = ({
  id,
  images,
  title,
  price,
  location,
  type,
  surface,
  rooms,
  hasLive,
  liveDate,
  viewers = 0,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const currentUrl = `${window.location.origin}/property/${id}`;

  const handleJoinLive = () => {
    navigate(`/live/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Link to={`/property/${id}`}>
          <img
            src={images[0]}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </Link>
        <div className="absolute top-2 left-2 flex gap-2">
          {hasLive && viewers > 0 && (
            <ViewersCounter count={viewers} />
          )}
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          {hasLive && (
            <div className="p-2 bg-[#ea384c] rounded-full shadow-md">
              <Video className="w-5 h-5 text-white" />
            </div>
          )}
          <PropertyActions title={title} currentUrl={currentUrl} />
        </div>
      </div>
      <div className="p-4">
        <Link to={`/property/${id}`}>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
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
        <div className="space-y-2">
          <OfferDialog title={title} price={price} />
          {hasLive && (
            <LiveButton
              id={id}
              title={title}
              liveDate={liveDate}
              onJoinLive={handleJoinLive}
            />
          )}
        </div>
      </div>
    </div>
  );
};