import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageSquare, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveChat } from "@/components/live/LiveChat";
import { LiveInfo } from "@/components/live/LiveInfo";
import { LiveStream } from "@/components/live/LiveStream";
import { LiveControls } from "@/components/live/LiveControls";
import { LiveSidebar } from "@/components/live/LiveSidebar";
import { useToast } from "@/hooks/use-toast";
import { type Property } from "@/types/property";
import { generateMockCoordinates } from "@/data/mockProperties";
import { useAuth } from "@/contexts/AuthContext";
import { Banner } from "@/components/layout/Banner";
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
  const [isFavorite, setIsFavorite] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [showBanner, setShowBanner] = useState(true);

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
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id, isAuthenticated, navigate, toast]);

  const handleMakeOffer = () => {
    toast({
      title: "Offre envoyée !",
      description: "Votre offre a été transmise à l'agent.",
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: `${property?.title} a été ${isFavorite ? "retiré de" : "ajouté à"} vos favoris.`,
    });
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
        {showBanner && (
          <div className="absolute top-0 left-0 right-0 z-50">
            <div className="relative">
              <Banner />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={() => setShowBanner(false)}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {!showBanner && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-50 bg-black/50 text-white hover:bg-black/75"
            onClick={() => setShowBanner(true)}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        )}

        <LiveStream videoId="n3wtxcO_0GQ" />
        <LiveControls isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />
        <LiveSidebar currentLiveId={Number(id)} lives={liveStreams} />

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <LiveInfo 
            property={property} 
            onMakeOffer={handleMakeOffer} 
            viewerCount={mockLiveData.viewerCount}
          />
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white hover:bg-black/75"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>

        {showChat && (
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-background border-l">
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
