import { VirtualTourViewer360 } from "@/components/virtual-tour/VirtualTourViewer360";
import { VirtualTourHotspot360 } from "@/components/virtual-tour/VirtualTourHotspot360";
import { Property } from "@/types/property";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { X } from "lucide-react";

interface PropertyVirtualTour360Props {
  property: Property;
}

export const PropertyVirtualTour360 = ({ property }: PropertyVirtualTour360Props) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(true);

  const handleContactAgent = () => {
    navigate(`/messages/agent/${property.agent.id}`);
  };

  const handleBookVisit = () => {
    toast({
      title: "Réservation de visite",
      description: "La fonctionnalité de réservation sera bientôt disponible.",
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Pour l'exemple, nous utilisons une URL de démo
  const mockTourUrl = "https://my.matterport.com/show/?m=TzhRashYdRt";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-6xl h-[80vh] p-0">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </button>
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
      </DialogContent>
    </Dialog>
  );
};