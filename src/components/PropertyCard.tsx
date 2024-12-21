import { Property } from "@/types/property";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FavoriteButton } from "./property/FavoriteButton";
import { ShareButtons } from "./properties/ShareButtons";
import { useState } from "react";
import { AgentCertificationBadge } from "./agent/AgentCertificationBadge";
import { OffersCounter } from "./property/OffersCounter";

interface PropertyCardProps extends Property {
  showLocation?: boolean;
  className?: string;
  offers?: number;
}

export const PropertyCard = ({
  id,
  title,
  price,
  location,
  surface,
  rooms,
  images,
  agent,
  hasLive,
  isLiveNow,
  liveDate,
  showLocation = true,
  className = "",
  isReplay,
  virtualTour,
  offers,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const [showShare, setShowShare] = useState(false);

  const handleClick = () => {
    navigate(`/property/${id}`);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShare(!showShare);
  };

  return (
    <Card 
      className={`overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow ${className}`}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={images[0]}
          alt={title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary">
            <Eye className="w-4 h-4 mr-2" />
            Visiter
          </Button>
        </div>
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {offers !== undefined && (
            <OffersCounter offers={offers} />
          )}
          {virtualTour?.enabled && (
            <Badge className="bg-background/80 backdrop-blur-sm">
              Visite virtuelle
            </Badge>
          )}
          {hasLive && !isReplay && (
            <Badge className="bg-primary/90 backdrop-blur-sm text-white">
              {isLiveNow ? "Live en cours" : `Live le ${new Date(liveDate!).toLocaleDateString()}`}
            </Badge>
          )}
          {isReplay && (
            <Badge className="bg-emerald-500/90 backdrop-blur-sm text-white">
              Replay disponible
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          <FavoriteButton propertyId={id} title={title} />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
            onClick={handleShareClick}
          >
            <Eye className="h-5 w-5" />
          </Button>
        </div>
        {showShare && (
          <div className="absolute top-14 right-2 z-10">
            <ShareButtons
              property={{
                title,
                price,
                location,
              }}
              currentUrl={window.location.href}
            />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-primary font-bold">{price.toLocaleString()} DH</p>
            {showLocation && (
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </div>
            )}
          </div>
          {agent && (
            <div className="flex flex-col items-end">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-10 h-10 rounded-full"
              />
              {agent.verified && (
                <AgentCertificationBadge rating={5} />
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span>{surface} m²</span>
          <span>•</span>
          <span>{rooms} pièces</span>
        </div>
        <Button variant="ghost" size="sm">
          Voir plus
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};