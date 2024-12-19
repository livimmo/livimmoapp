import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageCircle, Calendar, Info, RotateCw, ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[600px] bg-background rounded-lg overflow-hidden">
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
              Visite virtuelle Matterport
            </Badge>
          </div>

          <div className="absolute top-4 right-4">
            <Button
              variant="secondary"
              size="sm"
              className="bg-background/80 backdrop-blur-sm"
              onClick={toggleFullscreen}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
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
              <div className="text-sm text-muted-foreground">
                Agent: {agentName}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};