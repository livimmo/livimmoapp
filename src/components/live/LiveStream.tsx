import { Button } from "@/components/ui/button";
import { type LiveEvent } from "@/types/live";
import { X, Maximize, Minimize, MonitorPlay } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { LiveSidebar } from "./LiveSidebar";
import { LiveInfo } from "./LiveInfo";
import { useState } from "react";

interface LiveStreamProps {
  videoId: string;
  currentLiveId: number;
  otherLives: LiveEvent[];
  onLiveChange: (id: number) => void;
  isReplay?: boolean;
}

const REPLAY_IDS = [
  'VIQpb65HmMs',
  'VIQpb65HmMs?start=300',
  'VIQpb65HmMs?start=600',
  'VIQpb65HmMs?start=900',
  'VIQpb65HmMs?start=1200',
];

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
  isReplay = false
}: LiveStreamProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<'default' | 'cinema' | 'fullscreen'>('default');
  const [showChat, setShowChat] = useState(false);

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

  // Si c'est un replay, on prend un ID aléatoire parmi les replays
  const actualVideoId = isReplay ? 
    REPLAY_IDS[Math.floor(Math.random() * REPLAY_IDS.length)] : 
    videoId;

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
        src={`https://www.youtube.com/embed/${actualVideoId}?autoplay=1&mute=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />

      {/* Ajout de LiveInfo pour les replays */}
      <div className="absolute bottom-0 left-0 right-0">
        <LiveInfo 
          property={mockProperty}
          onMakeOffer={() => {}}
          viewerCount={Math.floor(Math.random() * 1000)}
          onToggleChat={() => setShowChat(!showChat)}
        />
      </div>

      <LiveSidebar currentLiveId={currentLiveId} lives={otherLives} />
    </div>
  );
};