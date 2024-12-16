import { Button } from "@/components/ui/button";
import { type LiveEvent } from "@/types/live";
import { X, Maximize, Minimize, MonitorPlay } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { LiveSidebar } from "./LiveSidebar";
import { useState } from "react";

interface LiveStreamProps {
  videoId: string;
  currentLiveId: number;
  otherLives: LiveEvent[];
  onLiveChange: (id: number) => void;
}

export const LiveStream = ({ 
  videoId, 
  currentLiveId,
  otherLives,
  onLiveChange 
}: LiveStreamProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<'default' | 'cinema' | 'fullscreen'>('default');

  const handleViewModeChange = (mode: 'default' | 'cinema' | 'fullscreen') => {
    if (mode === 'fullscreen') {
      document.documentElement.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setViewMode(mode);
  };

  const containerClasses = {
    default: "relative w-full h-full bg-black",
    cinema: "relative w-full h-[85vh] bg-black",
    fullscreen: "relative w-full h-screen bg-black"
  };

  return (
    <div className={containerClasses[viewMode]}>
      {isMobile && (
        <div className="absolute top-4 left-0 right-0 z-20 flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="bg-black/50 text-white hover:bg-black/75 backdrop-blur-sm"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {!isMobile && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {viewMode !== 'cinema' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleViewModeChange('cinema')}
              className="bg-black/50 text-white hover:bg-black/75"
            >
              <MonitorPlay className="h-5 w-5" />
            </Button>
          )}
          {viewMode === 'cinema' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleViewModeChange('default')}
              className="bg-black/50 text-white hover:bg-black/75"
            >
              <Minimize className="h-5 w-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleViewModeChange(viewMode === 'fullscreen' ? 'default' : 'fullscreen')}
            className="bg-black/50 text-white hover:bg-black/75"
          >
            {viewMode === 'fullscreen' ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="bg-black/50 text-white hover:bg-black/75"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />

      <LiveSidebar currentLiveId={currentLiveId} lives={otherLives} />
    </div>
  );
};