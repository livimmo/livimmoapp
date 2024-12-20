import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, ExternalLink, Heart, Radio, MessageSquare, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LiveOfferDialog } from "./LiveOfferDialog";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
  const navigate = useNavigate();

  // Animation des offres
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
      "p-2 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
      "transition-all duration-300 shadow-lg",
      "h-auto",
      "overflow-hidden",
      "flex flex-col",
      "fixed bottom-0 left-0 right-0",
      isMobile ? 'max-h-[40vh]' : 'max-h-[20vh]',
      "z-50",
      "border-t border-primary/20",
      "hover:bg-background/90 hover:shadow-xl",
      isFullscreen && "z-[9999]"
    )}>
      <div className="w-full max-w-5xl mx-auto">
        <div className={cn(
          "flex items-center gap-4",
          isMobile && "flex-col"
        )}>
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-12 w-20 bg-gray-200 rounded-md overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <Link 
                to={`/properties/${property.id}`}
                className="hover:underline flex items-center gap-2 group"
              >
                <h2 className="text-base font-semibold truncate group-hover:text-primary transition-colors">{property.title}</h2>
                <ExternalLink className="w-3.5 h-3.5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="default" 
                  className={`flex items-center gap-1 ${isReplay ? 'bg-[#33C3F0]' : 'bg-[#33C3F0]'} hover:${isReplay ? 'bg-[#33C3F0]/90' : 'bg-[#33C3F0]/90'} text-white shadow-sm`}
                >
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>{isReplay ? 'REPLAY' : 'LIVE'}</span>
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-[#33C3F0]">
                  <Users className="w-3.5 h-3.5" />
                  <span className="font-semibold">{viewerCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={cn(
            "flex items-center gap-4",
            isMobile ? "w-full justify-between" : "shrink-0"
          )}>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "bg-[#33C3F0]/10 hover:bg-[#33C3F0]/20 text-[#33C3F0] transition-colors",
                  isFavorite && "bg-[#33C3F0] text-white hover:bg-[#33C3F0]/90"
                )}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-[#33C3F0]/10 text-[#33C3F0] hover:bg-[#33C3F0]/20 transition-colors"
                onClick={onToggleChat}
              >
                <MessageSquare className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-[#33C3F0]/10 text-[#33C3F0] hover:bg-[#33C3F0]/20 transition-colors"
                onClick={() => navigate(-1)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            {!isMobile && (
              <>
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "bg-[#33C3F0]/10 text-[#33C3F0] shadow-sm",
                    "transition-all duration-300 ease-in-out",
                    "hover:scale-105"
                  )}
                >
                  {offerCount} offres
                </Badge>
                <p className="text-lg font-bold whitespace-nowrap text-[#33C3F0]">
                  {property.price.toLocaleString()} DH
                </p>
              </>
            )}
            <Button 
              className={cn(
                "bg-[#33C3F0] hover:bg-[#33C3F0]/90 text-white whitespace-nowrap shadow-sm transition-all hover:shadow-md",
                isMobile && "w-full"
              )}
              onClick={() => setIsOfferDialogOpen(true)}
            >
              <Heart className="w-4 h-4 mr-1.5" />
              Je suis intéressé(e)
            </Button>
          </div>
          
          {isMobile && (
            <div className="flex items-center justify-between w-full">
              <Badge 
                variant="secondary" 
                className={cn(
                  "bg-[#33C3F0]/10 text-[#33C3F0] shadow-sm",
                  "transition-all duration-300 ease-in-out",
                  "hover:scale-105"
                )}
              >
                {offerCount} offres
              </Badge>
              <p className="text-lg font-bold whitespace-nowrap text-[#33C3F0]">
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