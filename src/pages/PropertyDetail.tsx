import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail } from "lucide-react";
import { LiveButton } from "@/components/property/LiveButton";
import { useToast } from "@/hooks/use-toast";
import { PropertyDetailHeader } from "@/components/property/PropertyDetailHeader";
import { PropertyDetailContent } from "@/components/property/PropertyDetailContent";
import { mockProperties } from "@/data/mockProperties";
import { OfferDialog } from "@/components/property/OfferDialog";

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

            <OfferDialog title={property.title} price={property.price} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;