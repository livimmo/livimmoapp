import { LiveEvent } from "@/types/live";
import { Eye, ChevronRight, Heart } from "lucide-react";
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
        "fixed right-0 top-1/2 -translate-y-1/2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "border-l shadow-lg transition-all duration-300 z-50",
        isCollapsed ? "w-12" : "w-80"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute -left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-[#ea384c] hover:from-primary/90 hover:to-[#ea384c]/90",
          "text-white rounded-full shadow-lg transition-all duration-300 group",
          "hover:scale-110",
          isCollapsed ? "hover:translate-x-1" : "hover:-translate-x-1"
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="relative">
          <ChevronRight className={cn(
            "h-4 w-4 transition-transform duration-300",
            !isCollapsed && "rotate-180"
          )} />
          <div className="absolute -top-8 -right-3 flex flex-col items-center gap-1">
            <Badge 
              variant="secondary" 
              className="h-5 min-w-5 p-0 flex items-center justify-center bg-[#ea384c] text-white text-xs"
            >
              {otherLives.length}
            </Badge>
            <Badge 
              variant="secondary" 
              className="h-5 p-1 flex items-center gap-1 bg-[#F97316] text-white text-xs whitespace-nowrap"
            >
              12 offres
            </Badge>
            <Button
              size="sm"
              className="h-7 px-2 text-xs bg-primary hover:bg-primary/90 text-white"
            >
              <Heart className="h-3 w-3 mr-1" />
              Intéressé
            </Button>
          </div>
        </div>
      </Button>

      {!isCollapsed && (
        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-4">
            {otherLives.map(live => (
              <button
                key={live.id}
                className="w-full text-left hover:bg-accent p-2 rounded-lg transition-colors"
                onClick={() => navigate(`/live/${live.id}`)}
              >
                <div className="font-medium truncate">{live.title}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Eye className="h-3 w-3" />
                  <span>{live.viewers} spectateurs</span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};