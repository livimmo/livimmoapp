import { useNavigate } from "react-router-dom";
import { type Property } from "@/types/property";
import { PropertyImage } from "./property/PropertyImage";
import { PropertyInfo } from "./PropertyInfo";
import { PropertyActions } from "./property/PropertyActions";
import { FavoriteButton } from "./property/FavoriteButton";
import { Badge } from "./ui/badge";
import { AddLiveButton } from "./property/AddLiveButton";
import { useAuth } from "@/contexts/AuthContext";

type PropertyCardProps = Property & {
  viewers?: number;
  isLiveNow?: boolean;
  remainingSeats?: number;
  isUserRegistered?: boolean;
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
  isLiveNow,
  remainingSeats = 15,
  isUserRegistered = false,
  ...propertyProps
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const currentUrl = `${window.location.origin}/property/${id}`;
  const { user } = useAuth();
  const isAgentOrPromoter = user?.role === "agent" || user?.role === "promoter";

  const handleJoinLive = () => {
    navigate(`/live/${id}`);
  };

  const property = {
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
    ...propertyProps
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <PropertyImage
          id={id}
          title={title}
          image={images[0]}
          hasLive={hasLive}
          liveDate={liveDate}
          viewers={viewers}
          currentUrl={currentUrl}
          isLiveNow={isLiveNow}
          isUserRegistered={isUserRegistered}
          remainingSeats={remainingSeats}
        />
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <FavoriteButton propertyId={id} title={title} />
          <PropertyActions title={title} currentUrl={currentUrl} />
        </div>
        {!hasLive && (
          <div className="absolute top-2 left-2 z-10">
            <Badge variant="destructive">Vendu</Badge>
          </div>
        )}
      </div>
      <PropertyInfo
        id={id}
        title={title}
        price={price}
        location={location}
        type={type}
        surface={surface}
        rooms={rooms}
        hasLive={hasLive}
        liveDate={liveDate}
        onJoinLive={handleJoinLive}
        isLiveNow={isLiveNow}
        remainingSeats={remainingSeats}
        isUserRegistered={isUserRegistered}
      />
      {isAgentOrPromoter && (
        <div className="p-4 pt-0">
          <AddLiveButton property={property} />
        </div>
      )}
    </div>
  );
};