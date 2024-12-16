import { useNavigate } from "react-router-dom";
import { type Property } from "@/types/property";
import { PropertyImage } from "./property/PropertyImage";
import { PropertyInfo } from "./PropertyInfo";
import { PropertyActions } from "./property/PropertyActions";
import { FavoriteButton } from "./property/FavoriteButton";
import { Badge } from "./ui/badge";
import { getRandomTags } from "@/utils/propertyTags";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { CheckCircle2 } from "lucide-react";

type PropertyCardProps = Property & {
  viewers?: number;
  isLiveNow?: boolean;
  remainingSeats?: number;
  isUserRegistered?: boolean;
  offers?: number;
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
  offers = 0,
  agent,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const currentUrl = `${window.location.origin}/property/${id}`;
  const tags = getRandomTags();

  const handleJoinLive = () => {
    navigate(`/live/${id}`);
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
          offers={offers}
        />
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <FavoriteButton propertyId={id} title={title} />
          <PropertyActions title={title} currentUrl={currentUrl} />
        </div>
        <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1 max-w-[80%]">
          {!hasLive && (
            <Badge variant="destructive">Vendu</Badge>
          )}
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={
                tag === "Coup de fusil"
                  ? "destructive"
                  : tag === "Nouveauté"
                  ? "default"
                  : "secondary"
              }
              className="bg-white/90 backdrop-blur-sm"
            >
              {tag}
            </Badge>
          ))}
        </div>
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
      <div className="px-4 py-3 border-t flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage src={agent.image} alt={agent.name} />
            <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{agent.name}</span>
            <span className="text-xs text-gray-500">{agent.company || 'Agent indépendant'}</span>
          </div>
        </div>
        {agent.verified && (
          <div className="flex items-center gap-1 text-primary">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-xs">Vérifié</span>
          </div>
        )}
      </div>
    </div>
  );
};