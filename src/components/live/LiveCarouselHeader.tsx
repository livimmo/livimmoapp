import { Minimize2, Maximize2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveBadge } from "./LiveBadge";
import { cn } from "@/lib/utils";

interface LiveCarouselHeaderProps {
  liveCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const LiveCarouselHeader = ({ 
  liveCount, 
  isCollapsed, 
  onToggleCollapse 
}: LiveCarouselHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Button
        variant="default"
        size="lg"
        className={cn(
          "bg-primary/90 hover:bg-primary text-white gap-2 transition-all duration-300",
          "group flex items-center shadow-lg hover:shadow-xl",
          "hover:scale-105 transform",
          isCollapsed ? "w-auto" : "w-full justify-between"
        )}
        onClick={onToggleCollapse}
      >
        <div className="flex items-center gap-2">
          <LiveBadge count={liveCount} />
          <span className="font-medium">
            {isCollapsed 
              ? "autres visites en direct" 
              : "Découvrez d'autres biens en direct"
            }
          </span>
        </div>
        {isCollapsed ? (
          <Maximize2 className="h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Minimize2 className="h-5 w-5 group-hover:-rotate-45 transition-transform duration-300" />
        )}
      </Button>
    </div>
  );
};