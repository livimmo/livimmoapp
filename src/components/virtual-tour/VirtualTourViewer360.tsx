import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageCircle, Calendar, Info, RotateCw, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VirtualTourViewer360Props {
  tourUrl: string;
  propertyId: number;
  propertyTitle: string;
  agentName: string;
  onContactAgent: () => void;
  onBookVisit: () => void;
}

export const VirtualTourViewer360 = ({
  tourUrl,
  propertyId,
  propertyTitle,
  agentName,
  onContactAgent,
  onBookVisit
}: VirtualTourViewer360Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoom, setCurrentRoom] = useState('Entrée');
  const { toast } = useToast();
  const viewerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Simuler le chargement de la visite virtuelle
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRotate = () => {
    // Cette fonction serait utilisée pour contrôler la rotation de la vue 360°
    toast({
      title: "Rotation activée",
      description: "Utilisez votre souris pour faire pivoter la vue",
    });
  };

  const handleRoomChange = (direction: 'next' | 'prev') => {
    // Simulation du changement de pièce
    const rooms = ['Entrée', 'Salon', 'Cuisine', 'Chambre 1', 'Salle de bain'];
    const currentIndex = rooms.indexOf(currentRoom);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % rooms.length;
    } else {
      newIndex = currentIndex - 1 < 0 ? rooms.length - 1 : currentIndex - 1;
    }

    setCurrentRoom(rooms[newIndex]);
    toast({
      description: `Vous êtes maintenant dans : ${rooms[newIndex]}`,
    });
  };

  return (
    <div className="relative w-full h-[600px] bg-background rounded-lg overflow-hidden">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-accent">
          <div className="animate-pulse text-center">
            <p className="text-lg font-medium">Chargement de la visite virtuelle...</p>
            <p className="text-sm text-muted-foreground mt-2">{propertyTitle}</p>
          </div>
        </div>
      ) : (
        <>
          <iframe
            ref={viewerRef}
            src={tourUrl}
            className="w-full h-full border-0"
            allowFullScreen
          />
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              <Eye className="w-4 h-4 mr-1" />
              {currentRoom}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleRoomChange('prev')}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Pièce précédente
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleRoomChange('next')}
                >
                  Pièce suivante
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleRotate}
                >
                  <RotateCw className="w-4 h-4" />
                  Rotation
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={onContactAgent}
                >
                  <MessageCircle className="w-4 h-4" />
                  Contacter l'agent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={onBookVisit}
                >
                  <Calendar className="w-4 h-4" />
                  Réserver une visite
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};