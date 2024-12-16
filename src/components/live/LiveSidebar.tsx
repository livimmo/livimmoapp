import { LiveEvent } from "@/types/live";
import { Radio, ChevronRight, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface LiveSidebarProps {
  currentLiveId: number;
  lives: LiveEvent[];
}

export const LiveSidebar = ({ currentLiveId, lives }: LiveSidebarProps) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const otherLives = lives.filter(live => live.id !== currentLiveId && live.status === 'live');

  if (otherLives.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed right-0 top-0 h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "border-l shadow-lg transition-all duration-300 z-50",
        isCollapsed ? "w-12" : "w-72"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute -left-4 top-20 bg-gradient-to-r from-primary to-[#ea384c] hover:from-primary/90 hover:to-[#ea384c]/90",
          "text-white rounded-full shadow-lg transition-all duration-300 group",
          "hover:scale-110",
          isCollapsed ? "hover:translate-x-1" : "hover:-translate-x-1"
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="relative">
          {isCollapsed ? (
            <>
              <Radio className="h-4 w-4 animate-pulse" />
              <Badge 
                variant="secondary" 
                className="absolute -top-3 -right-3 h-5 min-w-5 p-0 flex items-center justify-center bg-[#ea384c] text-white text-xs"
              >
                {otherLives.length}
              </Badge>
            </>
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      </Button>

      {!isCollapsed && (
        <div className="h-full pt-6">
          <div className="px-4 mb-4">
            <h3 className="font-semibold text-sm">Autres Lives en cours</h3>
            <p className="text-xs text-muted-foreground">{otherLives.length} lives disponibles</p>
          </div>
          <ScrollArea className="h-[calc(100vh-100px)]">
            <div className="space-y-2 p-2">
              {otherLives.map(live => (
                <div
                  key={live.id}
                  className="group cursor-pointer hover:bg-accent rounded-lg p-2 transition-colors"
                  onClick={() => navigate(`/live/${live.id}`)}
                >
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={live.thumbnail} 
                        alt={live.title}
                        className="w-20 h-16 object-cover rounded-md"
                      />
                      <Badge 
                        variant="destructive" 
                        className="absolute top-1 left-1 scale-75"
                      >
                        Live
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {live.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="flex items-center gap-1 scale-90">
                          <Eye className="w-3 h-3" />
                          {live.viewers}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{live.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};