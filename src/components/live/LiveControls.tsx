import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LiveControlsProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const LiveControls = ({ isFavorite, onToggleFavorite }: LiveControlsProps) => {
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