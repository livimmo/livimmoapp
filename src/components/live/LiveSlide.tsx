import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiveEvent } from "@/types/live";
import { Eye, Calendar, Play, MapPin, User, Home } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface LiveSlideProps {
  live: LiveEvent;
  index: number;
}

export const LiveSlide = ({ live, index }: LiveSlideProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleJoinLive = () => {
    if (live.status === "live") {
      navigate(`/live/${live.id}`);
    } else {
      navigate(`/live/schedule/${live.id}`);
    }
  };

  // Extraire le quartier de la localisation
  const [city, district] = live.location.split(", ");

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
      <CardContent className="p-0 relative">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={live.thumbnail}
            alt={live.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="secondary" onClick={handleJoinLive}>
              <Play className="w-4 h-4 mr-2" />
              Rejoindre
            </Button>
          </div>
          <div className="absolute top-2 left-2">
            <Badge variant="destructive" className="animate-pulse flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              En direct
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-3 line-clamp-2">{live.title}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
              {format(new Date(live.date), "d MMMM à HH:mm", { locale: fr })}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Home className="w-4 h-4 mr-2 flex-shrink-0" />
              {live.type}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <div className="flex flex-col">
                <span>{city}</span>
                {district && <span className="text-xs text-muted-foreground">{district}</span>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${live.agent}`} />
                <AvatarFallback>{live.agent[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{live.agent}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>{live.viewers} spectateurs</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleJoinLive}>
          <Eye className="w-4 h-4 mr-2" />
          Voir plus
        </Button>
      </CardFooter>
    </Card>
  );
};