import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiveEvent } from "@/types/live";
import { Eye, Calendar, Play, MapPin, User, Home } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LiveSlideProps {
  live: LiveEvent;
  index: number;
}

export const LiveSlide = ({ live, index }: LiveSlideProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleAction = () => {
    if (live.status === "live") {
      navigate(`/live/${live.id}`);
    } else {
      navigate(`/property/${live.id}`);
    }
  };

  // Extraire le quartier de la localisation
  const [city, district] = live.location.split(", ");

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1'} gap-6 p-4`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-0 relative">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={live.thumbnail}
              alt={live.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[80%]">
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
                  variant="secondary"
                  className="bg-white/80 backdrop-blur-sm text-primary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {live.viewers && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm flex items-center gap-1.5">
                  <Eye className="w-3 h-3" />
                  {live.viewers} spectateurs
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 line-clamp-2 group-hover:text-primary transition-colors">
            {live.title}
          </h3>
          <div className="space-y-3">
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
                <AvatarImage 
                  src={`https://i.pravatar.cc/150?u=${live.agent}`} 
                  alt={live.agent} 
                />
                <AvatarFallback>
                  {live.agent.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{live.agent}</span>
                <span className="text-xs text-muted-foreground">Agent Livimmo</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button 
            onClick={handleAction} 
            className="w-full bg-[#ea384c] hover:bg-[#ea384c]/90 text-white"
            size="lg"
          >
            <Play className="w-4 h-4 mr-2" />
            {live.status === "live" ? "Rejoindre le live" : "Voir le replay"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};