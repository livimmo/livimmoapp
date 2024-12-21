import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LiveEvent } from "@/types/live";
import { Eye, Play, Clock, CheckCircle2, MapPin } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { LiveStream } from "./LiveStream";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FavoriteButton } from "../property/FavoriteButton";
import { ShareButtons } from "../properties/ShareButtons";

interface ReplayCardProps {
  live: LiveEvent;
}

export const ReplayCard = ({ live }: ReplayCardProps) => {
  const navigate = useNavigate();
  const [showReplay, setShowReplay] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleWatch = () => {
    setShowReplay(true);
  };

  const handleAgentClick = () => {
    const agentNumber = getAgentIdByName(live.agent);
    if (agentNumber) {
      navigate(`/agent/${agentNumber}`);
    }
  };

  const getAgentIdByName = (name: string): number => {
    const agentMap: Record<string, number> = {
      "Sarah Martin": 1,
      "Mohammed Alami": 2,
      "Yasmine Idrissi": 3,
      "Karim Benjelloun": 4,
      "Leila Amrani": 5,
    };
    return agentMap[name] || 1;
  };

  const isVerified = Math.random() > 0.5;

  return (
    <>
      <Card className="group cursor-pointer hover:bg-accent rounded-lg overflow-hidden transition-all duration-300">
        <CardContent className="p-0 relative">
          <img
            src={live.thumbnail}
            alt={live.title}
            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
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
          <div className="absolute bottom-2 left-2 right-2">
            <Badge variant="secondary" className="bg-black/50 text-white w-full flex items-center gap-1 justify-center">
              <MapPin className="w-3 h-3" />
              {live.location} {live.neighborhood && `- ${live.neighborhood}`}
            </Badge>
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
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
                e.stopPropagation();
                setShowShare(!showShare);
              }}
            >
              <Eye className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
            <Play className="w-12 h-12 text-white" />
          </div>
          {showShare && (
            <div className="absolute top-14 right-2 z-10">
              <ShareButtons
                property={{
                  title: live.title,
                  price: typeof live.price === 'string' 
                    ? parseInt(live.price.replace(/[^\d]/g, ""))
                    : live.price || 0,
                  location: live.location || '',
                }}
                currentUrl={window.location.href}
              />
            </div>
          )}
        </CardContent>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {live.title}
          </h3>
          <div className="text-sm text-muted-foreground mb-2">
            Diffusé le {format(new Date(live.date), "d MMMM yyyy", { locale: fr })}
          </div>
          {live.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {live.description}
            </p>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col gap-4">
          <Button onClick={handleWatch} variant="default" className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Visionner
          </Button>
          <div 
            className="flex items-center justify-between w-full pt-3 border-t cursor-pointer hover:bg-accent/50 transition-colors rounded-md p-2"
            onClick={handleAgentClick}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarImage 
                  src={`https://i.pravatar.cc/150?u=${live.agent.toLowerCase().replace(/\s/g, '')}`} 
                  alt={live.agent} 
                />
                <AvatarFallback>{live.agent.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{live.agent}</span>
                <span className="text-xs text-gray-500">Livimmo</span>
              </div>
            </div>
            {isVerified && (
              <div className="flex items-center gap-1 text-primary">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs">Vérifié</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showReplay} onOpenChange={setShowReplay}>
        <DialogContent className="max-w-6xl h-[80vh] p-0">
          <LiveStream 
            videoId="VIQpb65HmMs"
            currentLiveId={live.id}
            otherLives={[]}
            onLiveChange={() => {}}
            isReplay={true}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};