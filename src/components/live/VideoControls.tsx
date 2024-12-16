import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

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
        variant="default"
        size="sm"
        className="bg-primary/90 hover:bg-primary text-white transition-colors backdrop-blur-sm flex items-center gap-2"
        onClick={onToggleOtherLives}
      >
        <Video className="h-4 w-4" />
        <span className="text-sm">Autres lives en cours</span>
      </Button>
    </div>
  );
};