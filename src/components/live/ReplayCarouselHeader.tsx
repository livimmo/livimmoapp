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
          "bg-green-600 hover:bg-green-700 text-white gap-2 transition-all duration-300",
          "group flex items-center shadow-lg hover:shadow-xl",
          "hover:scale-105 transform",
          isCollapsed ? "w-auto" : "w-full justify-between",
          "z-[60]", // Augmenté le z-index pour être au-dessus de LiveInfo
          "absolute bottom-[90px]", // Positionné au-dessus de LiveInfo
          "left-4" // Ajout d'un padding à gauche
        )}
        onClick={onToggleCollapse}
      >
        <div className="flex items-center gap-2">
          <LiveBadge count={replayCount} className="text-green-600" />
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