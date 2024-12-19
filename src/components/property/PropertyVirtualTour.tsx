import { VirtualTourViewer } from "@/components/virtual-tour/VirtualTourViewer";
import { VirtualTourHotspot } from "@/components/virtual-tour/VirtualTourHotspot";
import { Property } from "@/types/property";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface PropertyVirtualTourProps {
  property: Property;
}

export const PropertyVirtualTour = ({ property }: PropertyVirtualTourProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContactAgent = () => {
    // Rediriger vers la messagerie avec l'agent
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
      <VirtualTourViewer
        tourUrl={mockTourUrl}
        propertyId={property.id}
        propertyTitle={property.title}
        agentName={property.agent.name}
        onContactAgent={handleContactAgent}
        onBookVisit={handleBookVisit}
      />
      
      {/* Exemple de hotspots - à personnaliser selon les besoins */}
      <VirtualTourHotspot
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
      
      <VirtualTourHotspot
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