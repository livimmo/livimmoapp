import { Property } from "@/types/property";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { LiveOfferDialog } from "./LiveOfferDialog";
import { LiveInfoHeader } from "./LiveInfoHeader";
import { LiveInfoActions } from "./LiveInfoActions";

interface LiveInfoProps {
  property: Property;
  onMakeOffer: () => void;
  viewerCount: number;
  onToggleChat?: () => void;
  isReplay?: boolean;
  isScheduled?: boolean;
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
  liveId: number;
}

export const LiveInfo = ({ 
  property, 
  viewerCount, 
  onToggleChat, 
  isReplay,
  isScheduled,
  onToggleFullscreen,
  isFullscreen,
  liveId
}: LiveInfoProps) => {
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [offerCount, setOfferCount] = useState(12);
  const isMobile = useIsMobile();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOfferCount(prev => {
        const change = Math.random() > 0.7 ? 1 : 0;
        return prev + change;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={cn(
      "p-2 backdrop-blur-md",
      "transition-all duration-300 shadow-lg",
      "h-auto",
      "overflow-hidden",
      "flex flex-col",
      "fixed bottom-0 left-0 right-0",
      isMobile ? 'max-h-[40vh]' : 'max-h-[20vh]',
      "z-50"
    )}>
      <div className="w-full max-w-5xl mx-auto">
        <div className={cn(
          "flex items-center gap-4",
          isMobile && "flex-col"
        )}>
          <LiveInfoHeader 
            property={property}
            viewerCount={viewerCount}
            isReplay={isReplay}
            isScheduled={isScheduled}
          />

          <LiveInfoActions 
            isReplay={isReplay}
            isScheduled={isScheduled}
            isMobile={isMobile}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            onToggleChat={onToggleChat}
            offerCount={offerCount}
            price={property.price}
            onOpenOfferDialog={() => setIsOfferDialogOpen(true)}
            liveId={liveId}
          />
        </div>
      </div>

      <LiveOfferDialog 
        title={property.title}
        price={property.price}
        isOpen={isOfferDialogOpen}
        onClose={() => setIsOfferDialogOpen(false)}
      />
    </Card>
  );
};
