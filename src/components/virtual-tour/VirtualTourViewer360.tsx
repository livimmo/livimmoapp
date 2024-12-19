import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, MessageCircle, Calendar, Info, 
  RotateCw, ArrowLeft, ArrowRight, Maximize2,
  MessageSquare, X 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LiveChat } from "@/components/live/LiveChat";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface VirtualTourViewer360Props {
  tourUrl: string;
  propertyId: number;
  propertyTitle: string;
  agentName: string;
  onContactAgent: () => void;
  onBookVisit: () => void;
  platform?: 'matterport' | 'klapty';
}

export const VirtualTourViewer360 = ({
  tourUrl,
  propertyId,
  propertyTitle,
  agentName,
  onContactAgent,
  onBookVisit,
  platform = 'matterport'
}: VirtualTourViewer360Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const viewerRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getEmbedUrl = () => {
    if (platform === 'klapty') {
      // Format Klapty URL
      return `https://www.klapty.com/tour/${tourUrl}`;
    }
    // Format Matterport URL (default)
    return `https://my.matterport.com/show/?m=${tourUrl}`;
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleQuickBook = () => {
    setShowBookingDialog(true);
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
            src={getEmbedUrl()}
            className="w-full h-full border-0"
            allowFullScreen
            allow="xr-spatial-tracking; gyroscope; accelerometer"
          />
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              <Eye className="w-4 h-4 mr-1" />
              Visite virtuelle {platform === 'klapty' ? 'Klapty' : 'Matterport'}
            </Badge>
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="bg-background/80 backdrop-blur-sm"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-background/80 backdrop-blur-sm"
              onClick={toggleFullscreen}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>

          {showChat && (
            <div className="absolute top-0 right-0 w-80 h-full">
              <LiveChat 
                messages={[]} 
                onClose={() => setShowChat(false)}
              />
            </div>
          )}

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
                  variant="default"
                  size="sm"
                  className="gap-2"
                  onClick={handleQuickBook}
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

      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Réserver une visite pour {propertyTitle}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              Choisissez une date et une heure qui vous conviennent pour visiter ce bien en personne avec {agentName}.
            </p>
            <Button onClick={() => {
              setShowBookingDialog(false);
              toast({
                title: "Demande envoyée",
                description: "L'agent immobilier vous contactera rapidement pour confirmer votre visite.",
              });
            }}>
              Envoyer la demande
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};