import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LiveOverlayControlsProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const LiveOverlayControls = ({
  isFavorite,
  onToggleFavorite,
}: LiveOverlayControlsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/75"
          onClick={() => navigate(-1)}
        >
          <X className="h-5 w-5" />
        </Button>
        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
          LIVE
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/75"
          onClick={onToggleFavorite}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </div>
    </div>
  );
};