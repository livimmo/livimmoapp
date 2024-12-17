import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { LiveInfo } from "./LiveInfo";
import { useState } from "react";
import { LiveCarousel } from "./LiveCarousel";
import { ReplayCarousel } from "./ReplayCarousel";
import { liveStreams } from "@/data/mockLives";
import { cn } from "@/lib/utils";
import { LiveStreamProps, replayTimestamps } from "@/types/live";
import { LiveHeader } from "./LiveHeader";
import { VideoControls } from "./VideoControls";

export const LiveStream = ({ 
  videoId, 
  currentLiveId,
  otherLives,
  onLiveChange,
  isReplay = false,
}: LiveStreamProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showOtherLives, setShowOtherLives] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);

  const currentLiveId = Number(id);
  const otherLives = liveStreams.filter(live => live.id !== currentLiveId);

  const handleLiveSelect = (liveId: number) => {
    navigate(`/live/${liveId}`);
  };

  const getEmbedUrl = () => {
    const baseUrl = 'https://www.youtube.com/embed/';
    const videoIdWithTimestamp = isReplay 
      ? replayTimestamps[Math.floor(Math.random() * replayTimestamps.length)]
      : videoId;
    
    return `${baseUrl}${videoIdWithTimestamp}?rel=0&modestbranding=1&showinfo=0&autoplay=1`;
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      <div className="relative flex-1">
        <LiveHeader 
          otherLivesCount={otherLives.length}
          isMobile={isMobile}
          onClose={() => navigate(-1)}
          onToggleOtherLives={() => setShowOtherLives(!showOtherLives)}
        />

        <div className="relative w-full h-full z-[1] group">
          <iframe
            src={getEmbedUrl()}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <VideoControls 
          showOtherLives={showOtherLives}
          onToggleOtherLives={() => setShowOtherLives(!showOtherLives)}
          isReplay={isReplay}
          count={otherLives.length}
        />

        <div 
          className={cn(
            "absolute left-0 right-0 z-[51] transition-all duration-300 ease-in-out",
            showOtherLives 
              ? "bottom-[64px] opacity-100" 
              : "-bottom-full opacity-0"
          )}
        >
          {isReplay ? (
            <ReplayCarousel
              replays={liveStreams}
              currentReplayId={currentLiveId}
              onReplaySelect={handleLiveSelect}
            />
          ) : (
            <LiveCarousel
              lives={liveStreams}
              currentLiveId={currentLiveId}
              onLiveSelect={handleLiveSelect}
            />
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-[52]">
          <LiveInfo 
            property={mockProperty}
            onMakeOffer={() => {}}
            viewerCount={Math.floor(Math.random() * 1000)}
            onToggleChat={() => setShowChat(!showChat)}
            isReplay={isReplay}
          />
        </div>
      </div>
    </div>
  );
};