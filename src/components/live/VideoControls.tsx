import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { LiveBadge } from "./LiveBadge";

interface VideoControlsProps {
  showOtherLives: boolean;
  onToggleOtherLives: () => void;
  isReplay?: boolean;
  count?: number;
}

export const VideoControls = ({ 
  showOtherLives, 
  onToggleOtherLives,
  isReplay = false,
  count = 0
}: VideoControlsProps) => {
  // Only show button for replays, remove it for live streams
  if (!isReplay) return null;

  return (
    <div className="absolute bottom-[64px] left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex justify-between items-center gap-2 z-[51]">
      <Button
        variant="default"
        size="lg"
        className="bg-blue-600/90 hover:bg-blue-600 text-white gap-2 transition-all duration-300 backdrop-blur-sm flex items-center"
        onClick={onToggleOtherLives}
      >
        <LiveBadge count={count} className="text-blue-600" />
        <span className="text-sm">autres replays disponibles</span>
      </Button>
    </div>
  );
};