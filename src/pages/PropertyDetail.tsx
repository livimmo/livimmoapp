import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail } from "lucide-react";
import { LiveButton } from "@/components/property/LiveButton";
import { useToast } from "@/hooks/use-toast";
import { PropertyDetailHeader } from "@/components/property/PropertyDetailHeader";
import { PropertyDetailContent } from "@/components/property/PropertyDetailContent";

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

const PropertyDetail = () => {
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
        <PropertyDetailHeader
          property={property}
          isFavorite={isFavorite}
          handleToggleFavorite={handleToggleFavorite}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <PropertyDetailContent property={property} />

          <div className="space-y-4">
            {property.hasLive && (
              <Card className="p-4 bg-accent">
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
