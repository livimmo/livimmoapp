import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { LiveInfo } from "./LiveInfo";
import { useState, useEffect } from "react";
import { LiveCarousel } from "./LiveCarousel";
import { ReplayCarousel } from "./ReplayCarousel";
import { liveStreams } from "@/data/mockLives";
import { cn } from "@/lib/utils";
import { LiveHeader } from "./LiveHeader";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AIChat } from "./AIChat";
import { LiveChapters } from "./LiveChapters";
import { LiveVideoPlayer } from "./LiveVideoPlayer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { type LiveEvent } from "@/types/live";

const mockProperty = {
  id: "1",
  title: "Villa Moderne avec Piscine",
  price: 2500000,
  location: "Marrakech",
  type: "Villa",
  surface: 350,
  rooms: 5,
  bathrooms: 3,
  description: "Magnifique villa moderne avec piscine et jardin paysager",
  features: ["Piscine", "Jardin", "Garage"],
  images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"],
  hasLive: true,
  liveDate: new Date(),
  agent: {
    id: "1",
    name: "Karim Benjelloun",
    avatar: "https://i.pravatar.cc/150?u=karim",
    image: "https://i.pravatar.cc/150?u=karim",
    phone: "+212 6 00 11 22 33",
    email: "karim.benjelloun@example.com",
    location: "Marrakech",
    type: "agent"
  },
  coordinates: {
    lat: 31.7917,
    lng: -7.0926,
  },
  transactionType: "Vente" as const,
};

interface LiveStreamProps {
  videoId: string;
  currentLiveId: number;
  otherLives: LiveEvent[];
  onLiveChange: (liveId: number) => void;
  isReplay?: boolean;
}

export const LiveStream = ({ 
  videoId, 
  currentLiveId,
  otherLives,
  onLiveChange,
  isReplay = false,
}: LiveStreamProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showOtherLives, setShowOtherLives] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
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

  const currentLive = liveStreams.find(live => live.id === currentLiveId);
  const startTime = currentLive ? format(new Date(currentLive.date), "'En live depuis' HH'h'mm", { locale: fr }) : '';

  const handleLiveSelect = (liveId: number) => {
    navigate(`/live/${liveId}`);
  };

  const handleChapterClick = (timestamp: string) => {
    console.log("Navigation vers le timestamp:", timestamp);
  };

  if (!isAuthenticated) {
    return null;
  }

  const processedLives = liveStreams.map(live => ({
    ...live,
    date: new Date(live.date instanceof Date ? live.date : new Date(live.date))
  }));

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      <LiveHeader 
        otherLivesCount={otherLives.length}
        isMobile={isMobile}
        onClose={() => navigate(-1)}
        onToggleOtherLives={() => setShowOtherLives(!showOtherLives)}
      />

      {!isReplay && (
        <div className="absolute top-20 right-4 z-[52] bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
          {startTime}
        </div>
      )}

      <div className="flex-1 flex flex-col relative">
        <div className={cn(
          "flex-1 relative z-[1] group",
          isMobile ? "p-0" : "p-4 pb-24"
        )}>
          <div className={cn(
            "relative w-full h-full overflow-hidden",
            !isMobile && "rounded-xl border-2 border-primary/20 shadow-lg"
          )}>
            <LiveVideoPlayer 
              videoId={videoId} 
              isReplay={isReplay}
            />
          </div>
        </div>

        <div className="absolute bottom-[84px] left-0 right-0 z-[51]">
          {isReplay ? (
            <ReplayCarousel
              replays={processedLives}
              currentReplayId={currentLiveId}
              onReplaySelect={handleLiveSelect}
            />
          ) : (
            <LiveCarousel
              lives={processedLives}
              currentLiveId={currentLiveId}
              onLiveSelect={handleLiveSelect}
            />
          )}
        </div>

        <div className={cn(
          "absolute bottom-0 left-0 right-0 z-[52]",
          "bg-gradient-to-t from-black/80 to-transparent pt-8"
        )}>
          <LiveInfo 
            property={mockProperty}
            onMakeOffer={() => {}}
            viewerCount={Math.floor(Math.random() * 1000)}
            onToggleChat={() => setShowAIChat(!showAIChat)}
            isReplay={isReplay}
            liveId={currentLiveId}
          />
        </div>

        {showAIChat && (
          <div className="absolute top-0 right-0 bottom-0 w-80 z-[100]">
            <AIChat 
              property={mockProperty}
              onClose={() => setShowAIChat(false)}
            />
          </div>
        )}

        <div className="absolute top-20 left-4 bottom-[200px] w-80 space-y-4 z-[51]">
          {isReplay && <LiveChapters onChapterClick={handleChapterClick} isReplay={true} />}
        </div>
      </div>
    </div>
  );
};
