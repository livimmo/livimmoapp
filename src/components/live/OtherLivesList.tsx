import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Video } from "lucide-react";
import { LiveEvent } from "@/types/live";
import { useNavigate } from "react-router-dom";

interface OtherLivesListProps {
  showOtherLives: boolean;
  setShowOtherLives: (show: boolean) => void;
  otherLives: LiveEvent[];
}

export const OtherLivesList = ({
  showOtherLives,
  setShowOtherLives,
  otherLives,
}: OtherLivesListProps) => {
  const navigate = useNavigate();

  return (
    <div className={`absolute transition-all duration-300 ease-in-out ${showOtherLives ? 'bottom-24' : '-bottom-32'} left-4 right-4`}>
      <Button
        variant="ghost"
        size="sm"
        className="absolute -top-8 right-4 bg-black/75 text-white hover:bg-black/90"
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
            Voir les autres lives
          </>
        )}
      </Button>
      <div className="bg-black/75 p-4 rounded-lg">
        <h3 className="text-white text-sm font-medium mb-2">Autres lives en cours</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {otherLives.map((live) => (
            <div
              key={live.id}
              className="flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity"
              onClick={() => navigate(`/live/${live.id}`)}
            >
              <div className="relative w-48">
                <img
                  src={live.thumbnail}
                  alt={live.title}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                  <p className="text-white text-xs font-medium truncate">{live.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Video className="w-3 h-3 text-red-500" />
                    <span className="text-white text-xs">{live.viewers} spectateurs</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};