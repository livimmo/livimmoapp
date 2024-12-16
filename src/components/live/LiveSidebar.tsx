import { LiveEvent } from "@/types/live";
import { Radio, ChevronDown, ChevronUp, Eye } from "lucide-react";
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
        "fixed left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "border-b shadow-lg transition-all duration-300 z-40",
        isCollapsed ? "h-12" : "h-48"
      )}
      style={{
        bottom: isCollapsed ? "calc(64px + 56px)" : "calc(64px + 56px)",
      }}
    >
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "relative bg-white hover:bg-white/90 px-3",
            "text-[#ea384c] shadow-lg transition-all duration-300 group",
            "hover:scale-110"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="relative flex items-center gap-2">
            <Radio className="h-4 w-4 text-[#ea384c]" />
            <span className="text-sm font-medium">
              {otherLives.length} lives en cours
            </span>
            {isCollapsed ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </Button>
      </div>

      {!isCollapsed && (
        <ScrollArea className="h-full pt-2 pb-8">
          <div className="flex gap-4 px-4 overflow-x-auto">
            {otherLives.map(live => (
              <div
                key={live.id}
                className="group cursor-pointer hover:bg-accent rounded-lg p-2 transition-colors flex-shrink-0 w-64"
                onClick={() => navigate(`/live/${live.id}`)}
              >
                <div className="space-y-2">
                  <div className="relative">
                    <img 
                      src={live.thumbnail} 
                      alt={live.title}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <Badge 
                      variant="destructive" 
                      className="absolute top-1 left-1 scale-75"
                    >
                      Live
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className="absolute bottom-1 left-1 scale-75 flex items-center gap-1 bg-black/75 text-white"
                    >
                      <Eye className="w-3 h-3" />
                      {live.viewers}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {live.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">{live.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};