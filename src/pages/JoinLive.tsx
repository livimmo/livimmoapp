import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LiveChat } from "@/components/live/LiveChat";
import { LiveInfo } from "@/components/live/LiveInfo";
import { LiveStream } from "@/components/live/LiveStream";
import { useToast } from "@/hooks/use-toast";
import { type Property } from "@/types/property";
import { generateMockCoordinates } from "@/data/mockProperties";
import { useAuth } from "@/contexts/AuthContext";
import { liveStreams } from "@/data/mockLives";

const mockLiveData = {
  viewerCount: 45,
  messages: [
    { id: 1, user: "Sophie Martin", message: "Quelle est la superficie du jardin ?", timestamp: new Date() },
    { id: 2, user: "Agent", message: "Le jardin fait 500m²", timestamp: new Date() },
  ],
};

export const JoinLive = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [viewerCount, setViewerCount] = useState(mockLiveData.viewerCount);
  const [isFavorite, setIsFavorite] = useState(false);

  const currentLiveId = Number(id);
  const otherLives = liveStreams.filter(live => live.id !== currentLiveId);

  const handleLiveChange = (newLiveId: number) => {
    navigate(`/live/${newLiveId}`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder à ce live",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Simulate loading property data
    const timer = setTimeout(() => {
      const location = "Marrakech";
      setProperty({
        id: 1,
        title: "Villa Moderne avec Piscine",
        price: 2500000,
        location: location,
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
        coordinates: generateMockCoordinates(location),
        transactionType: "Vente" as const,
      });
      setIsLoading(false);
    }, 1500);

    // Simulate viewer count updates
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(0, prev + change);
      });
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(viewerInterval);
    };
  }, [id, isAuthenticated, navigate, toast]);

  const handleMakeOffer = () => {
    setShowOfferForm(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Connexion au live en cours...</p>
          <p className="text-sm text-muted-foreground">Préparez-vous pour la visite en direct</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500">Live non disponible</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[calc(100vh-4rem)]">
        <LiveStream 
          videoId="n3wtxcO_0GQ" 
          currentLiveId={currentLiveId}
          otherLives={otherLives}
          onLiveChange={handleLiveChange}
        />

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <LiveInfo 
            property={property} 
            onMakeOffer={() => setShowOfferForm(true)} 
            viewerCount={viewerCount}
            onToggleChat={() => setShowChat(!showChat)}
            liveId={currentLiveId}
          />
        </div>

        {showChat && (
          <div className="absolute top-0 right-0 bottom-0 w-80 z-[100]">
            <LiveChat 
              messages={mockLiveData.messages} 
              onClose={() => setShowChat(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinLive;