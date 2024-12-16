import { useState, useEffect } from "react";
import { LiveStream } from "./LiveStream";
import { LiveControls } from "./LiveControls";
import { LiveCarousel } from "./LiveCarousel";
import { LiveChat } from "./LiveChat";
import { LiveInfo } from "./LiveInfo";
import { Property } from "@/types/property";
import { LiveEvent } from "@/types/live";
import { liveStreams } from "@/data/mockLives";
import { cn } from "@/lib/utils";

interface LiveStreamingViewProps {
  property: Property;
  isHost?: boolean;
  onEndStream?: () => void;
}

export const LiveStreamingView = ({
  property,
  isHost = false,
  onEndStream = () => {},
}: LiveStreamingViewProps) => {
  const [showChat, setShowChat] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [availableLives, setAvailableLives] = useState<LiveEvent[]>(liveStreams);
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: string }>>([]);

  useEffect(() => {
    // Simuler un nombre aléatoire de spectateurs
    const randomViewers = Math.floor(Math.random() * 100) + 1;
    setViewerCount(randomViewers);
  }, []);

  const handleEndStream = () => {
    onEndStream();
  };

  const handleToggleChat = () => {
    setShowChat(!showChat);
  };

  const handleCloseLive = (liveId: number) => {
    setAvailableLives(prev => prev.filter(live => live.id !== liveId));
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <div className="relative h-screen bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <LiveStream 
          videoId="dQw4w9WgXcQ"
          currentLiveId={property.id}
          otherLives={availableLives}
          onLiveChange={(id: number) => {
            window.location.href = `/live/${id}`;
          }}
        />
      </div>

      {isHost && (
        <div className="absolute top-4 right-4">
          <LiveControls onEndStream={handleEndStream} />
        </div>
      )}

      {!isHost && (
        <div className="absolute bottom-0 left-0 right-0">
          <LiveInfo
            property={property}
            onMakeOffer={() => {}}
            viewerCount={viewerCount}
            onToggleChat={handleToggleChat}
          />
        </div>
      )}

      <div
        className={cn(
          "absolute top-0 bottom-[calc(64px+56px)] right-0 w-96 bg-black/75 backdrop-blur-sm transition-transform duration-300",
          showChat ? "translate-x-0" : "translate-x-full"
        )}
      >
        <LiveChat 
          messages={messages}
          onClose={handleCloseChat}
        />
      </div>

      <div className="absolute bottom-[64px] left-0 right-0">
        <LiveCarousel
          lives={availableLives}
          currentLiveId={property.id}
          onLiveSelect={(liveId) => {
            window.location.href = `/live/${liveId}`;
          }}
          onLiveClose={handleCloseLive}
        />
      </div>
    </div>
  );
};