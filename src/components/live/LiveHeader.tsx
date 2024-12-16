import { Button } from "@/components/ui/button";
import { LiveBadge } from "./LiveBadge";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveHeaderProps {
  otherLivesCount: number;
  isMobile: boolean;
  onClose: () => void;
  onToggleOtherLives: () => void;
  className?: string;
}

export const LiveHeader = ({ 
  otherLivesCount, 
  isMobile, 
  onClose, 
  onToggleOtherLives,
  className 
}: LiveHeaderProps) => {
  return (
    <div className={cn("absolute top-4 left-4 z-[52] flex items-center gap-2", className)}>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
          onClick={onClose}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        className="bg-black/50 hover:bg-black/75 text-white transition-colors backdrop-blur-sm flex items-center gap-2"
        onClick={onToggleOtherLives}
      >
        <LiveBadge count={otherLivesCount} />
        <span className="text-sm">Lives en cours</span>
      </Button>
    </div>
  );
};