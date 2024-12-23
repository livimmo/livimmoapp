import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { liveStreams } from "@/data/mockLives";
import { type LiveEvent } from "@/types/live";
import { LiveVideoPlayer } from "./LiveVideoPlayer";
import { LiveInfo } from "./LiveInfo";
import { LiveStreamingControls } from "./LiveStreamingControls";
import { LiveChat } from "./LiveChat";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { mockProperties } from "@/data/mockProperties";

const LiveStream = ({ 
  videoId, 
  currentLiveId,
  otherLives,
  onLiveChange,
  isReplay = false,
}: {
  videoId: string;
  currentLiveId: number;
  otherLives: LiveEvent[];
  onLiveChange: (liveId: number) => void;
  isReplay?: boolean;
}) => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [viewerCount, setViewerCount] = useState(Math.floor(Math.random() * 1000));
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour accéder au live",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate, toast]);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.random() > 0.7 ? 1 : -1;
        return Math.max(0, prev + change);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentLive = liveStreams.find(live => live.id === currentLiveId);
  const mockProperty = mockProperties.find(p => p.id === currentLiveId.toString()) || mockProperties[0];

  if (!isAuthenticated || !currentLive) {
    return null;
  }

  const handleEndStream = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      <div className="flex-1 relative">
        <LiveVideoPlayer 
          videoId={videoId} 
          isReplay={isReplay}
        />

        {showChat && (
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-background/95 backdrop-blur-sm">
            <LiveChat 
              messages={[]} 
              onClose={() => setShowChat(false)}
            />
          </div>
        )}

        <LiveStreamingControls
          viewerCount={viewerCount}
          onEndStream={handleEndStream}
          showDescription={showDescription}
          onToggleDescription={() => setShowDescription(!showDescription)}
        />

        <LiveInfo 
          property={mockProperty}
          onMakeOffer={() => {}}
          viewerCount={viewerCount}
          onToggleChat={() => setShowChat(!showChat)}
          isReplay={isReplay}
          liveId={currentLiveId}
        />
      </div>
    </div>
  );
};

export default LiveStream;