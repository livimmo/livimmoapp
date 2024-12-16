import { useNavigate } from "react-router-dom";
import { type Property } from "@/types/property";
import { PropertyImage } from "./property/PropertyImage";
import { PropertyInfo } from "./PropertyInfo";
import { PropertyActions } from "./property/PropertyActions";
import { FavoriteButton } from "./property/FavoriteButton";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Check } from "lucide-react";

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
  agent,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const currentUrl = `${window.location.origin}/property/${id}`;

  const handleJoinLive = () => {
    navigate(`/live/${id}`);
  };

  const handleAgentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/agent/${agent.id}`);
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
      <div 
        className="px-4 pb-4 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleAgentClick}
      >
        <Avatar className="h-8 w-8 border border-primary/10">
          <AvatarImage src={agent.image} alt={agent.name} />
          <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-600">{agent.name}</span>
          {agent.isVerified && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </div>
      </div>
    </div>
  );
};