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
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const mockProperty = {
  id: 1,
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
    name: "Karim Benjelloun",
    image: "https://i.pravatar.cc/150?u=karim",
    phone: "+212 6 00 11 22 33",
    email: "karim.benjelloun@example.com",
  },
  coordinates: {
    lat: 31.7917,
    lng: -7.0926,
  },
  transactionType: "Vente" as const,
};

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
  const otherLivesCount = liveStreams.filter(live => live.id !== currentLiveId).length;

  const currentLive = liveStreams.find(live => live.id === currentLiveId);
  const startTime = currentLive ? format(currentLive.date, "'En live depuis' HH'h'mm", { locale: fr }) : '';

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
      <LiveHeader 
        otherLivesCount={otherLivesCount}
        isMobile={isMobile}
        onClose={() => navigate(-1)}
        onToggleOtherLives={() => setShowOtherLives(!showOtherLives)}
      />

      {!isReplay && (
        <div className="absolute top-20 left-4 z-[52] bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
          {startTime}
        </div>
      )}

      <div className="flex-1 flex flex-col relative">
        <div className={cn(
          "flex-1 relative z-[1] group",
          isMobile ? "p-0" : "p-4 pb-20"
        )}>
          <div className={cn(
            "relative w-full h-full overflow-hidden",
            !isMobile && "rounded-xl border-2 border-primary/20 shadow-lg"
          )}>
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
        </div>

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
            onToggleChat={() => {}}
            isReplay={isReplay}
          />
        </div>
      </div>
    </div>
  );
};