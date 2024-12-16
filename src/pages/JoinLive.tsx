import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Video, Users, MessageSquare, Heart, X, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveChat } from "@/components/live/LiveChat";
import { LiveInfo } from "@/components/live/LiveInfo";
import { useToast } from "@/hooks/use-toast";
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [showOtherLives, setShowOtherLives] = useState(false);

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
        {/* YouTube Live Embed */}
        <div className="absolute inset-0 bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/n3wtxcO_0GQ?autoplay=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Overlay controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 text-white hover:bg-black/75"
              onClick={() => navigate(-1)}
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
              LIVE
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 text-white hover:bg-black/75"
              onClick={handleToggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>

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

        {/* Bannière pliable des autres lives */}
        <div className={`absolute transition-all duration-300 ease-in-out ${showOtherLives ? 'bottom-24' : '-bottom-32'} left-4 right-4`}>
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-8 right-4 bg-black/75 text-white hover:bg-black/90"
            onClick={() => setShowOtherLives(!showOtherLives)}
          >
            {showOtherLives ? (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Masquer les autres lives
              </>
            ) : (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Voir les autres lives
              </>
            )}
          </Button>
          <div className="bg-black/75 p-4 rounded-lg">
            <h3 className="text-white text-sm font-medium mb-2">Autres lives en cours</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {otherLives.map((live) => (
                <div
                  key={live.id}
                  className="flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity"
                  onClick={() => navigate(`/live/${live.id}`)}
                >
                  <div className="relative w-48">
                    <img
                      src={live.thumbnail}
                      alt={live.title}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                      <p className="text-white text-xs font-medium truncate">{live.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Video className="w-3 h-3 text-red-500" />
                        <span className="text-white text-xs">{live.viewers} spectateurs</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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