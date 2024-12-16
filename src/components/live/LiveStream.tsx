import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { LiveInfo } from "./LiveInfo";
import { useState } from "react";

interface LiveStreamProps {
  videoId: string;
  currentLiveId: number;
  otherLives: any[];
  onLiveChange?: (liveId: number) => void;
  isReplay?: boolean;
}

// Liste des timestamps pour les replays
const replayTimestamps = [
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
  isReplay = false,
}: LiveStreamProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<'default' | 'cinema' | 'fullscreen'>('default');
  const [showChat, setShowChat] = useState(false);

  const handleViewModeChange = (mode: 'default' | 'cinema' | 'fullscreen') => {
    if (mode === 'fullscreen') {
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.requestFullscreen();
      }
      return;
    }
    setViewMode(mode);
  };

  // Fonction pour générer l'URL de l'embed YouTube
  const getEmbedUrl = () => {
    const baseUrl = 'https://www.youtube.com/embed/';
    const videoIdWithTimestamp = isReplay 
      ? replayTimestamps[Math.floor(Math.random() * replayTimestamps.length)]
      : videoId;
    
    return `${baseUrl}${videoIdWithTimestamp}?autoplay=1&rel=0&modestbranding=1&showinfo=0`;
  };

  // Styles conditionnels en fonction du mode de visualisation
  const containerStyles = {
    default: 'w-full lg:w-[calc(100%-350px)]',
    cinema: 'w-full',
    fullscreen: 'w-full h-screen fixed inset-0 z-50 bg-black',
  };

  const videoContainerStyles = {
    default: 'aspect-video w-full relative',
    cinema: 'aspect-video w-full max-w-[1600px] mx-auto relative',
    fullscreen: 'w-full h-full',
  };

  return (
    <div 
      className={`
        relative flex flex-col lg:flex-row
        ${containerStyles[viewMode]}
        ${viewMode === 'cinema' ? 'bg-black' : ''}
      `}
    >
      <div className={videoContainerStyles[viewMode]}>
        <iframe
          src={getEmbedUrl()}
          title="YouTube video player"
          frameBorder="0"
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
            isReplay={isReplay}
          />
        </div>
      </div>
    </div>
  );
};