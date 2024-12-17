import { Button } from "@/components/ui/button";
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
  isMobile, 
  onClose,
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
    </div>
  );
};