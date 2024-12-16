import { LiveEvent } from "@/types/live";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

interface LiveSidebarProps {
  currentLiveId: number;
  lives: LiveEvent[];
}

export const LiveSidebar = ({ currentLiveId, lives }: LiveSidebarProps) => {
  const navigate = useNavigate();
  const otherLives = lives.filter(live => live.id !== currentLiveId && live.status === 'live');

  if (otherLives.length === 0) return null;

  return (
    <div className="absolute right-0 top-0 bottom-0 w-64 bg-black/80 text-white p-4">
      <h3 className="font-semibold mb-4">Autres lives en cours</h3>
      <ScrollArea className="h-[calc(100%-2rem)]">
        <div className="space-y-4">
          {otherLives.map((live) => (
            <div
              key={live.id}
              className="group cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors"
              onClick={() => navigate(`/live/${live.id}`)}
            >
              <div className="relative mb-2">
                <img
                  src={live.thumbnail}
                  alt={live.title}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 right-2 bg-black/50 text-white flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  {live.viewers}
                </Badge>
              </div>
              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary">
                {live.title}
              </h4>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};