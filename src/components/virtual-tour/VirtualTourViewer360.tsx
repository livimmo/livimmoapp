import { useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { LiveChat } from "@/components/live/LiveChat";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LiveOfferDialog } from "@/components/live/LiveOfferDialog";
import { ReservationForm } from "@/components/home/ReservationForm";
import { Button } from "@/components/ui/button";
import { VirtualTourControls } from "@/components/virtual-tour/VirtualTourControls";
import { VirtualTourHeader } from "@/components/virtual-tour/VirtualTourHeader";

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
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [showReservationDialog, setShowReservationDialog] = useState(false);
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
      return `https://www.klapty.com/tour/${tourUrl}`;
    }
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
    setShowReservationDialog(true);
  };

  const handleMakeOffer = () => {
    setShowOfferDialog(true);
  };

  return (
    <div ref={containerRef} className="relative w-full h-[90vh] md:h-[600px] bg-background rounded-lg overflow-hidden">
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

          <VirtualTourHeader
            platform={platform}
            onToggleChat={() => setShowChat(!showChat)}
            onToggleFullscreen={toggleFullscreen}
          />

          {showChat && (
            <div className="absolute top-0 right-0 w-80 h-full">
              <LiveChat 
                messages={[]} 
                onClose={() => setShowChat(false)}
              />
            </div>
          )}

          <VirtualTourControls
            agentName={agentName}
            onContactAgent={onContactAgent}
            onBookVisit={handleQuickBook}
            onMakeOffer={handleMakeOffer}
            onToggleChat={() => setShowChat(!showChat)}
            onClose={() => document.exitFullscreen()}
          />
        </>
      )}

      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
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

      {showOfferDialog && (
        <LiveOfferDialog
          title={propertyTitle}
          price={500000}
          isOpen={showOfferDialog}
          onClose={() => setShowOfferDialog(false)}
        />
      )}

      {showReservationDialog && (
        <ReservationForm
          live={{
            id: propertyId,
            title: propertyTitle,
            date: new Date(),
            availableSeats: 1,
          }}
          onClose={() => setShowReservationDialog(false)}
        />
      )}
    </div>
  );
};