import { Button } from "@/components/ui/button";
import { Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LiveBadge } from "./LiveBadge";

interface ReplayCarouselHeaderProps {
  replayCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ReplayCarouselHeader = ({
  replayCount,
  isCollapsed,
  onToggleCollapse,
}: ReplayCarouselHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Button
        variant="default"
        size="lg"
        className={cn(
          "bg-blue-600/90 hover:bg-blue-600 text-white gap-2 transition-all duration-300",
          "group flex items-center shadow-lg hover:shadow-xl",
          "hover:scale-105 transform",
          isCollapsed ? "w-auto" : "w-full justify-between"
        )}
        onClick={onToggleCollapse}
      >
        <div className="flex items-center gap-2">
          <LiveBadge count={replayCount} className="text-blue-600" />
          <span className="font-medium">
            {isCollapsed 
              ? "autres replays disponibles" 
              : "Découvrez d'autres replays disponibles"
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