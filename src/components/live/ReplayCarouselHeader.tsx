import { Button } from "@/components/ui/button";
import { Video, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="absolute inset-x-0 -top-8 flex justify-center">
      <Button
        variant="ghost"
        size="sm"
        className="relative bg-black/50 hover:bg-black/75 px-3 text-white shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        onClick={onToggleCollapse}
      >
        <div className="relative flex items-center gap-2">
          <Video className="h-4 w-4" />
          <span className="text-sm font-medium">
            {replayCount} replays disponibles
          </span>
          {isCollapsed ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </Button>
    </div>
  );
};