import { Button } from "@/components/ui/button";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { LiveEvent } from "@/types/live";
import { useNavigate } from "react-router-dom";

interface LiveControlsProps {
  showOtherLives: boolean;
  setShowOtherLives: (show: boolean) => void;
  otherLives: LiveEvent[];
}

export const LiveControls = ({ 
  showOtherLives, 
  setShowOtherLives, 
  otherLives 
}: LiveControlsProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/75"
          onClick={() => navigate(-1)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="absolute bottom-4 right-4">
        <Button
          variant="ghost"
          size="sm"
          className="bg-black/75 text-white hover:bg-black/90"
          onClick={() => setShowOtherLives(!showOtherLives)}
        >
          {showOtherLives ? (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Masquer les autres lives
            </>
          ) : (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              Voir les autres lives ({otherLives.length})
            </>
          )}
        </Button>
      </div>
    </>
  );
};