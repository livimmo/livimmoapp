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
  return (
    <div className="absolute bottom-[64px] left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex justify-between items-center gap-2 z-[51]">
    </div>
  );
};