import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoControlsProps {
  showOtherLives: boolean;
  onToggleOtherLives: () => void;
}

export const VideoControls = ({ 
  showOtherLives, 
  onToggleOtherLives 
}: VideoControlsProps) => {
  return (
    <div className="absolute bottom-[64px] left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex justify-between items-center gap-2 z-[51]">
      <Button
        variant="ghost"
        size="sm"
        className="bg-black/50 hover:bg-black/75 text-white transition-colors backdrop-blur-sm flex items-center gap-2"
        onClick={onToggleOtherLives}
      >
        <span className="text-sm">Autres lives en cours</span>
      </Button>
    </div>
  );
};