import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiveEvent } from "@/types/live";
import { Eye, Calendar, Play } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface LiveSlideProps {
  live: LiveEvent;
  index: number;
}

export const LiveSlide = ({ live, index }: LiveSlideProps) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (live.status === "live") {
      navigate(`/live/${live.id}`);
    } else {
      navigate(`/property/${live.id}`);
    }
  };

  const getActionButton = () => {
    switch (live.status) {
      case "live":
        return (
          <Button onClick={handleAction} className="w-full bg-[#ea384c] hover:bg-[#ea384c]/90 text-white border-[#ea384c]">
            <Play className="w-4 h-4 mr-2" />
            Rejoindre le live
          </Button>
        );
      case "scheduled":
        return (
          <Button onClick={handleAction} variant="outline" className="w-full">
            <Calendar className="w-4 h-4 mr-2" />
            Réserver
          </Button>
        );
      default:
        return (
          <Button onClick={handleAction} variant="secondary" className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Visionner
          </Button>
        );
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0 relative">
        <img
          src={live.thumbnail}
          alt={live.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {live.status === "live" && (
            <Badge variant="destructive" className="animate-pulse">
              En direct
            </Badge>
          )}
          {live.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        {live.viewers && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {live.viewers}
            </Badge>
          </div>
        )}
      </CardContent>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{live.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          {format(new Date(live.date), "d MMMM à HH:mm", { locale: fr })}
        </div>
        {live.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {live.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {getActionButton()}
      </CardFooter>
    </Card>
  );
};