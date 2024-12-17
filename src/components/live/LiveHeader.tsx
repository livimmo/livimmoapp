import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { LiveBadge } from "./LiveBadge";

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
        <>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            onClick={onClose}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="default"
            size="sm"
            className="bg-[#ea384c]/90 hover:bg-[#ea384c] text-white gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            onClick={onToggleOtherLives}
          >
            <LiveBadge count={otherLivesCount} />
            <span className="font-medium">autres visites en direct</span>
          </Button>
        </>
      )}
    </div>
  );
};