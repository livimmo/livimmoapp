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
}

export const LiveInfo = ({ 
  property, 
  viewerCount, 
  onToggleChat, 
  isReplay,
  isScheduled,
  onToggleFullscreen,
  isFullscreen 
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

  // Define theme colors based on live status
  const themeColor = isReplay 
    ? '#16A34A' // Vert pour les replays
    : isScheduled 
      ? '#F97316' // Orange pour les lives programmés
      : '#EF4444'; // Rouge pour les lives en cours
      
  const bgOpacity = 'bg-white'; // Fond blanc pour tous les états
      
  const hoverBgOpacity = isReplay 
    ? 'hover:bg-green-50' 
    : isScheduled
      ? 'hover:bg-orange-50'
      : 'hover:bg-red-50';
      
  const borderColor = isReplay 
    ? 'border-green-500/20' 
    : isScheduled
      ? 'border-orange-500/20'
      : 'border-red-500/20';

  return (
    <Card className={cn(
      "p-2 backdrop-blur-md",
      "transition-all duration-300 shadow-lg",
      "h-auto",
      "overflow-hidden",
      "flex flex-col",
      "fixed bottom-0 left-0 right-0",
      isMobile ? 'max-h-[40vh]' : 'max-h-[20vh]',
      "z-50",
      bgOpacity,
      borderColor,
      "border-t",
      hoverBgOpacity,
      isFullscreen && "z-[9999]"
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
          />
          
          {isMobile && (
            <div className="flex items-center justify-between w-full">
              <Badge 
                variant="secondary" 
                className={cn(
                  isReplay 
                    ? 'bg-green-500/10 text-green-600'
                    : isScheduled
                      ? 'bg-orange-500/10 text-orange-500'
                      : 'bg-red-500/10 text-red-500',
                  "shadow-sm",
                  "transition-all duration-300 ease-in-out",
                  "hover:scale-105"
                )}
              >
                {isReplay ? "Virtual" : `${offerCount} offres`}
              </Badge>
              <p className="text-lg font-bold whitespace-nowrap" style={{ color: themeColor }}>
                {property.price.toLocaleString()} DH
              </p>
            </div>
          )}
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