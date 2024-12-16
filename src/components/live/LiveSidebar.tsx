import { LiveEvent } from "@/types/live";
import { Eye, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LiveSidebarProps {
  currentLiveId: number;
  lives: LiveEvent[];
}

export const LiveSidebar = ({ currentLiveId, lives }: LiveSidebarProps) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const otherLives = lives.filter(live => live.id !== currentLiveId && live.status === 'live');

  if (otherLives.length === 0) return null;

  return (
    <div 
      className={cn(
        "absolute right-0 top-0 bottom-0 bg-black/80 text-white transition-all duration-300",
        isCollapsed ? "w-12" : "w-64"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-4 top-1/2 -translate-y-1/2 bg-black/80 text-white hover:bg-black/60 rounded-full"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronRight className={cn(
          "h-4 w-4 transition-transform",
          isCollapsed ? "" : "rotate-180"
        )} />
      </Button>

      {!isCollapsed && (
        <>
          <h3 className="font-semibold mb-4 p-4">Autres lives en cours</h3>
          <ScrollArea className="h-[calc(100%-2rem)]">
            <div className="space-y-4 px-4">
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
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge 
                        variant="secondary" 
                        className="bg-black/50 text-white flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        {live.viewers}
                      </Badge>
                      <Badge 
                        variant="destructive" 
                        className="animate-pulse"
                      >
                        Live
                      </Badge>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary">
                    {live.title}
                  </h4>
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};