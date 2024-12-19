import { LiveEvent } from "@/types/live";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LiveCarouselCardProps {
  live: LiveEvent;
  currentLiveId: number;
  onLiveSelect: (liveId: number) => void;
  onLiveClose?: (liveId: number) => void;
}

export const LiveCarouselCard = ({
  live,
  currentLiveId,
  onLiveSelect,
  onLiveClose,
}: LiveCarouselCardProps) => {
  const navigate = useNavigate();

  const handleAgentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Utilisation de l'ID de l'agent depuis les données mockées
    const agentId = live.agentId || getAgentIdByName(live.agent);
    if (agentId) {
      navigate(`/agent/${agentId}`);
    }
  };

  // Fonction helper pour obtenir l'ID de l'agent à partir de son nom
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

  return (
    <div
      className={cn(
        "relative group cursor-pointer rounded-lg overflow-hidden",
        "transition-all duration-200 hover:ring-2 hover:ring-primary",
        live.id === currentLiveId && "ring-2 ring-primary"
      )}
    >
      <div onClick={() => onLiveSelect(live.id)}>
        <img
          src={live.thumbnail}
          alt={live.title}
          className="w-full aspect-video object-cover"
        />
        {onLiveClose && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 z-10 bg-black/50 hover:bg-black/75 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onLiveClose(live.id);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge variant="secondary" className="bg-primary text-white">
            Rejoindre
          </Badge>
        </div>
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[80%]">
          <Badge 
            variant="destructive" 
            className="flex items-center gap-1.5 px-2 py-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="animate-pulse">En direct</span>
          </Badge>
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
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
          <p className="text-white text-sm font-medium truncate">
            {live.title}
          </p>
        </div>
      </div>
      <div 
        className="px-2 py-2 border-t flex items-center justify-between bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={handleAgentClick}
      >
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 border border-gray-200">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${live.agent.toLowerCase().replace(/\s/g, '')}`} alt={live.agent} />
            <AvatarFallback>{live.agent.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-900 truncate max-w-[120px]">{live.agent}</span>
            <span className="text-[10px] text-gray-500">Livimmo</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-primary">
          <CheckCircle2 className="h-3 w-3" />
          <span className="text-[10px]">Vérifié</span>
        </div>
      </div>
    </div>
  );
};