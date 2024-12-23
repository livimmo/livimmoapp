import { Button } from "@/components/ui/button";
import { Phone, X, MessageSquare, Calendar } from "lucide-react";

interface VirtualTourControlsProps {
  agentName: string;
  onBookVisit: () => void;
  onMakeOffer: () => void;
  onToggleChat: () => void;
  onClose: () => void;
}

export const VirtualTourControls = ({
  agentName,
  onBookVisit,
  onMakeOffer,
  onToggleChat,
  onClose,
}: VirtualTourControlsProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
      <Button
        variant="ghost"
        size="icon"
        className="bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316]/20 transition-colors"
        onClick={onMakeOffer}
      >
        <Calendar className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316]/20 transition-colors"
        onClick={onToggleChat}
      >
        <MessageSquare className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316]/20 transition-colors"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};