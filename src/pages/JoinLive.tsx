import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveChat } from "@/components/live/LiveChat";
import { LiveInfo } from "@/components/live/LiveInfo";
import { LiveVideoPlayer } from "@/components/live/LiveVideoPlayer";
import { LiveControls } from "@/components/live/LiveControls";
import { type Property } from "@/types/property";
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
  const [isLoading, setIsLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [showOtherLives, setShowOtherLives] = useState(false);

  // Filtrer les autres lives en cours (excluant le live actuel)
  const otherLives = liveStreams.filter(live => live.id !== Number(id));

  useEffect(() => {
    let isMounted = true;

    const loadProperty = async () => {
      // Simulate loading property data
      const propertyData = {
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
      };

      if (isMounted) {
        setProperty(propertyData);
        setIsLoading(false);
      }
    };

    loadProperty();

    return () => {
      isMounted = false;
    };
  }, [id]);

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
          <Button onClick={() => window.history.back()} className="mt-4">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[calc(100vh-4rem)]">
        <LiveVideoPlayer videoId="n3wtxcO_0GQ" />

        <LiveControls 
          showOtherLives={showOtherLives}
          setShowOtherLives={setShowOtherLives}
          otherLives={otherLives}
        />

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <LiveInfo 
            property={property} 
            onMakeOffer={() => {}} 
            viewerCount={mockLiveData.viewerCount}
            showRating={true}
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
            <LiveChat messages={mockLiveData.messages} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinLive;