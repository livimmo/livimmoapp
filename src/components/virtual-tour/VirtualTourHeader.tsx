import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, Maximize2 } from "lucide-react";

interface VirtualTourHeaderProps {
  platform?: 'matterport' | 'klapty';
  onToggleChat: () => void;
  onToggleFullscreen: () => void;
}

export const VirtualTourHeader = ({
  platform = 'matterport',
  onToggleChat,
  onToggleFullscreen,
}: VirtualTourHeaderProps) => {
  return (
    <>
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
          <Eye className="w-4 h-4 mr-1 text-[#F97316]" />
          Visite virtuelle {platform === 'klapty' ? 'Klapty' : 'Matterport'}
        </Badge>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={onToggleChat}
        >
          <MessageSquare className="w-4 h-4 text-[#F97316]" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={onToggleFullscreen}
        >
          <Maximize2 className="w-4 h-4 text-[#F97316]" />
        </Button>
      </div>
    </>
  );
};