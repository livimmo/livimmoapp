import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveChat } from "@/components/live/LiveChat";
import { LiveInfo } from "@/components/live/LiveInfo";
import { useToast } from "@/hooks/use-toast";
import { type Property } from "@/types/property";
import { liveStreams } from "@/data/mockLives";
import { LiveOverlayControls } from "@/components/live/LiveOverlayControls";
import { OtherLivesList } from "@/components/live/OtherLivesList";

const mockLiveData = {
  viewerCount: 45,
  messages: [
    { id: 1, user: "Sophie Martin", message: "Quelle est la superficie du jardin ?", timestamp: new Date() },
    { id: 2, user: "Agent", message: "Le jardin fait 500m²", timestamp: new Date() },
  ],
};

export const JoinLive = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [showOtherLives, setShowOtherLives] = useState(false);
  const [isLiveStarted, setIsLiveStarted] = useState(true); // Démarrer le live automatiquement

  // Filtrer les autres lives en cours (excluant le live actuel)
  const otherLives = liveStreams.filter(live => live.id !== Number(id));

  useEffect(() => {
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
        coordinates: {
          lat: 31.7917,
          lng: -7.0926,
        },
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

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
        {/* YouTube Live Embed */}
        <div className="absolute inset-0 bg-black">
          {isLiveStarted ? (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/n3wtxcO_0GQ?autoplay=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Button 
                variant="default" 
                size="lg"
                onClick={() => setIsLiveStarted(true)}
                className="bg-red-500 hover:bg-red-600"
              >
                Démarrer le live
              </Button>
            </div>
          )}
        </div>

        <LiveOverlayControls 
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Bottom controls */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <LiveInfo 
            property={property} 
            onMakeOffer={handleToggleFavorite} 
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

        <OtherLivesList 
          showOtherLives={showOtherLives}
          setShowOtherLives={setShowOtherLives}
          otherLives={otherLives}
        />

        {/* Chat sidebar */}
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