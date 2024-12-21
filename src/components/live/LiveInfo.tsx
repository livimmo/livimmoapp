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
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
}

export const LiveInfo = ({ 
  property, 
  viewerCount, 
  onToggleChat, 
  isReplay,
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
      "bg-[#33C3F0]/5",
      isReplay ? 'border-[#33C3F0]/20' : 'border-[#ea384c]/20',
      "border-t",
      "hover:bg-[#33C3F0]/10",
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
          />

          <LiveInfoActions 
            isReplay={isReplay}
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
                  isReplay ? 'bg-[#33C3F0]/10 text-[#33C3F0]' : 'bg-[#ea384c]/10 text-[#ea384c]',
                  "shadow-sm",
                  "transition-all duration-300 ease-in-out",
                  "hover:scale-105"
                )}
              >
                {offerCount} offres
              </Badge>
              <p className="text-lg font-bold whitespace-nowrap" style={{ color: isReplay ? '#33C3F0' : '#ea384c' }}>
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