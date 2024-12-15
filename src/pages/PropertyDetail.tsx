import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Video, Heart, Users, Calendar, CircleDot } from "lucide-react";
import { ShareButtons } from "@/components/properties/ShareButtons";
import { LiveButton } from "@/components/property/LiveButton";
import { useToast } from "@/hooks/use-toast";

export const mockProperties = [
  {
    id: 1,
    title: "Villa de luxe avec piscine à Casablanca",
    price: 4500000,
    description: "Cette villa moderne de 400 m² située à Anfa offre une vue imprenable sur la mer, une piscine privée, et un grand jardin.",
    location: "Anfa, Casablanca",
    type: "Villa",
    surface: 400,
    rooms: 6,
    bathrooms: 3,
    features: ["Piscine", "Jardin", "Parking", "Sécurité 24/7", "Vue mer"],
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    ],
    hasLive: true,
    liveDate: new Date("2024-03-20T15:00:00"),
    isLiveNow: true,
    viewers: 45,
    remainingSeats: 10,
    agent: {
      name: "Sarah Alami",
      phone: "+212 6 12 34 56 78",
      email: "sarah.alami@example.com",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
    }
  },
];

export const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);

  const property = mockProperties.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500">Propriété non trouvée</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  const handleJoinLive = () => {
    navigate(`/live/${property.id}`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: `${property.title} a été ${isFavorite ? "retiré de" : "ajouté à"} vos favoris.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container px-4 py-8">
        <div className="mb-8">
          <div className="relative">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video">
                      <img
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Live Status Badges */}
            {property.hasLive && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {property.isLiveNow ? (
                  <>
                    <Badge className="bg-[#ea384c]/90 backdrop-blur-sm text-white animate-pulse">
                      <CircleDot className="w-4 h-4 mr-1" />
                      Live en cours
                    </Badge>
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {property.viewers} spectateurs
                    </Badge>
                  </>
                ) : (
                  <Badge className="bg-primary/90 backdrop-blur-sm text-white">
                    <Calendar className="w-4 h-4 mr-1" />
                    Live le {new Date(property.liveDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Badge>
                )}
              </div>
            )}

            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/90 backdrop-blur-sm"
                onClick={handleToggleFavorite}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <ShareButtons property={property} currentUrl={window.location.href} />
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <p className="text-2xl font-semibold text-primary mb-4">
              {property.price.toLocaleString()} DH
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {property.location}
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-accent rounded-lg">
                <div className="font-semibold">{property.surface} m²</div>
                <div className="text-sm text-muted-foreground">Surface</div>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <div className="font-semibold">{property.rooms}</div>
                <div className="text-sm text-muted-foreground">Pièces</div>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <div className="font-semibold">{property.bathrooms}</div>
                <div className="text-sm text-muted-foreground">Salle de bains</div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{property.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Équipements</h2>
              <div className="flex flex-wrap gap-2">
                {property.features.map((feature) => (
                  <Badge key={feature} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {property.hasLive && (
              <Card className="p-4 bg-accent">
                <div className="flex items-center gap-2 mb-2">
                  {property.isLiveNow ? (
                    <CircleDot className="h-5 w-5 text-[#ea384c] animate-pulse" />
                  ) : (
                    <Calendar className="h-5 w-5 text-primary" />
                  )}
                  <span className="font-semibold">
                    {property.isLiveNow ? "Live en cours" : "Live programmé"}
                  </span>
                </div>
                {!property.isLiveNow && property.liveDate && (
                  <p className="text-sm mb-4">
                    {new Date(property.liveDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
                <LiveButton
                  id={property.id}
                  title={property.title}
                  liveDate={property.liveDate}
                  onJoinLive={handleJoinLive}
                  isLiveNow={property.isLiveNow}
                  remainingSeats={property.remainingSeats}
                />
              </Card>
            )}

            <Card className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{property.agent.name}</h3>
                  <p className="text-sm text-muted-foreground">Agent immobilier</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  {property.agent.phone}
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  {property.agent.email}
                </Button>
              </div>
            </Card>

            <Button className="w-full">Faire une offre</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;