import { Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveBadge } from "./LiveBadge";

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
      <div className="flex items-center gap-2">
        <h3 
          className="text-white font-semibold flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onToggleCollapse}
        >
          <LiveBadge count={liveCount} />
          Autres lives en cours
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={onToggleCollapse}
        >
          {isCollapsed ? (
            <Maximize2 className="h-5 w-5" />
          ) : (
            <Minimize2 className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};