import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Euro, MessageCircle, X } from "lucide-react";

interface VirtualTourControlsProps {
  agentName: string;
  onContactAgent: () => void;
  onBookVisit: () => void;
  onMakeOffer: () => void;
  onToggleChat: () => void;
  onClose: () => void;
}

export const VirtualTourControls = ({
  agentName,
  onContactAgent,
  onBookVisit,
  onMakeOffer,
  onToggleChat,
  onClose,
}: VirtualTourControlsProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316]/20 transition-colors"
            onClick={onContactAgent}
          >
            <MessageCircle className="w-4 h-4 mr-1.5" />
            <span className="hidden md:inline">Contacter l'agent</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316]/20 transition-colors"
            onClick={onBookVisit}
          >
            <Calendar className="w-4 h-4 mr-1.5" />
            <span className="hidden md:inline">Réserver une visite</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316]/20 transition-colors"
            onClick={onMakeOffer}
          >
            <Euro className="w-4 h-4 mr-1.5" />
            <span className="hidden md:inline">Faire une offre</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316]/20 transition-colors"
            onClick={onToggleChat}
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316]/20 transition-colors"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Agent: {agentName}
        </div>
      </div>
    </div>
  );
};