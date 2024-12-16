import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiveEvent } from "@/types/live";
import { Eye, Play, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface ReplayCardProps {
  live: LiveEvent;
}

export const ReplayCard = ({ live }: ReplayCardProps) => {
  const navigate = useNavigate();

  const handleWatch = () => {
    navigate(`/replay/${live.id}`);
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
          <Badge variant="secondary" className="bg-black/50 text-white">
            <Clock className="w-3 h-3 mr-1" />
            45 min
          </Badge>
          {live.viewers && (
            <Badge variant="secondary" className="bg-black/50 text-white flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {live.viewers}
            </Badge>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
          <Play className="w-12 h-12 text-white" />
        </div>
      </CardContent>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{live.title}</h3>
        <div className="text-sm text-muted-foreground mb-2">
          Diffusé le {format(new Date(live.date), "d MMMM yyyy", { locale: fr })}
        </div>
        {live.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {live.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleWatch} variant="secondary" className="w-full">
          <Play className="w-4 h-4 mr-2" />
          Visionner
        </Button>
      </CardFooter>
    </Card>
  );
};