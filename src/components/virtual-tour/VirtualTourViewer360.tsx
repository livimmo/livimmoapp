import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageCircle, Calendar, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VirtualTourViewer360Props {
  tourUrl?: string;
  propertyId: string;
  propertyTitle: string;
  agentName: string;
  onContactAgent: () => void;
  onBookVisit: () => void;
}

export const VirtualTourViewer360 = ({
  tourUrl = "TzhRashYdRt", // Default example tour
  propertyId,
  propertyTitle,
  agentName,
  onContactAgent,
  onBookVisit
}: VirtualTourViewer360Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [viewCount, setViewCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setViewCount(Math.floor(Math.random() * 100));
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleError = () => {
    toast({
      title: "Erreur de chargement",
      description: "Impossible de charger la visite virtuelle. Veuillez réessayer plus tard.",
      variant: "destructive"
    });
  };

  const embedUrl = `https://my.matterport.com/show/?m=${tourUrl}`;

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
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            allow="xr-spatial-tracking"
            onError={handleError}
          />
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              <Eye className="w-4 h-4 mr-1" />
              {viewCount} vues
            </Badge>
            <Badge className="bg-primary text-primary-foreground">
              Guide: {agentName}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
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
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => {
                  toast({
                    title: "Informations",
                    description: "Cette visite virtuelle vous permet d'explorer le bien à 360°. Utilisez votre souris ou votre doigt pour naviguer.",
                  });
                }}
              >
                <Info className="w-4 h-4" />
                Aide
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};