import { LiveEvent } from "@/types/live";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { Calendar, Users, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { ReservationForm } from "../home/ReservationForm";
import { FavoriteButton } from "../property/FavoriteButton";
import { ShareButtons } from "../properties/ShareButtons";
import { useAuth } from "@/contexts/AuthContext";

interface LiveCardProps {
  live: LiveEvent;
}

export const LiveCard = ({ live }: LiveCardProps) => {
  const [showReservation, setShowReservation] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const { isAuthenticated } = useAuth();
  
  const formattedDate = live.date
    ? new Date(live.date).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const handleReservationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowReservation(true);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background">
      <Link
        to={live.status === "live" ? `/live/${live.id}` : `/live/schedule/${live.id}`}
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={live.thumbnail}
            alt={live.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex flex-wrap gap-2 max-w-[80%]">
            {live.status === "live" && (
              <Badge variant="destructive" className="animate-pulse flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                En direct
              </Badge>
            )}
            {live.tags?.map((tag) => (
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
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <FavoriteButton
              propertyId={live.id}
              title={live.title}
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
              onClick={(e) => {
                e.preventDefault();
                setShowShare(!showShare);
              }}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {live.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{live.availableSeats} places restantes</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <img
              src={`https://i.pravatar.cc/150?u=${live.agent}`}
              alt={live.agent}
              className="h-6 w-6 rounded-full"
            />
            <span className="text-sm text-muted-foreground">{live.agent}</span>
          </div>
        </div>
      </Link>

      {live.status !== "live" && (
        <>
          <Button 
            className="w-full mt-4"
            onClick={handleReservationClick}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Réserver
          </Button>

          {showReservation && !isAuthenticated && (
            <ReservationForm
              live={{
                id: live.id,
                title: live.title,
                date: new Date(live.date),
                availableSeats: live.availableSeats,
              }}
              onClose={() => setShowReservation(false)}
            />
          )}

          {showReservation && isAuthenticated && (
            <div className="mt-4 p-4 border-t">
              <ReservationForm
                live={{
                  id: live.id,
                  title: live.title,
                  date: new Date(live.date),
                  availableSeats: live.availableSeats,
                }}
                onClose={() => setShowReservation(false)}
              />
            </div>
          )}
        </>
      )}

      {showShare && (
        <div className="absolute top-14 right-2 z-10">
          <ShareButtons
            property={{
              title: live.title,
              price: typeof live.price === 'string' 
                ? parseInt(live.price.replace(/[^\d]/g, ""))
                : live.price,
              location: live.location,
            }}
            currentUrl={window.location.href}
          />
        </div>
      )}
    </div>
  );
};