import { VirtualTourViewer360 } from "@/components/virtual-tour/VirtualTourViewer360";
import { VirtualTourHotspot360 } from "@/components/virtual-tour/VirtualTourHotspot360";
import { Property } from "@/types/property";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface PropertyVirtualTour360Props {
  property: Property;
}

export const PropertyVirtualTour360 = ({ property }: PropertyVirtualTour360Props) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContactAgent = () => {
    navigate(`/messages/agent/${property.agent.id}`);
  };

  const handleBookVisit = () => {
    toast({
      title: "Réservation de visite",
      description: "La fonctionnalité de réservation sera bientôt disponible.",
    });
  };

  // Pour l'exemple, nous utilisons une URL de démo
  const mockTourUrl = "https://my.matterport.com/show/?m=SxQL3iGyvQk";

  return (
    <div className="relative">
      <VirtualTourViewer360
        tourUrl={mockTourUrl}
        propertyId={property.id}
        propertyTitle={property.title}
        agentName={property.agent.name}
        onContactAgent={handleContactAgent}
        onBookVisit={handleBookVisit}
      />
      
      {/* Exemple de hotspots - à personnaliser selon les besoins */}
      <VirtualTourHotspot360
        info={{
          title: "Cuisine équipée",
          description: "Cuisine moderne entièrement équipée avec électroménager haut de gamme",
          details: [
            { label: "Surface", value: "15 m²" },
            { label: "Équipements", value: "Four, Plaque, Frigo" }
          ]
        }}
        position={{ x: 30, y: 40 }}
      />
      
      <VirtualTourHotspot360
        info={{
          title: "Salon lumineux",
          description: "Grand salon avec baies vitrées donnant sur la terrasse",
          details: [
            { label: "Surface", value: "35 m²" },
            { label: "Exposition", value: "Sud-Ouest" }
          ]
        }}
        position={{ x: 70, y: 60 }}
      />
    </div>
  );
};