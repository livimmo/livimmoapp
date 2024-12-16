import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

interface VideoControlsProps {
  showOtherLives: boolean;
  onToggleOtherLives: () => void;
  isReplay?: boolean;
}

export const VideoControls = ({ 
  showOtherLives, 
  onToggleOtherLives,
  isReplay = false
}: VideoControlsProps) => {
  return (
    <div className="absolute bottom-[64px] left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex justify-between items-center gap-2 z-[51]">
      <Button
        variant="default"
        size="sm"
        className="bg-[#ea384c]/90 hover:bg-[#ea384c] text-white transition-colors backdrop-blur-sm flex items-center gap-2"
        onClick={onToggleOtherLives}
      >
        <Video className="h-4 w-4" />
        <span className="text-sm">Autres {isReplay ? 'replays' : 'lives'} en cours</span>
      </Button>
    </div>
  );
};