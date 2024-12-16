import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, ExternalLink, Heart, Radio, MessageSquare, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LiveOfferDialog } from "./LiveOfferDialog";
import { useState } from "react";
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
  const [offerCount] = useState(12);
  const isMobile = useIsMobile();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleClose = () => {
    // Rediriger vers la section replay
    navigate('/?tab=replay');
  };

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
                  className={`flex items-center gap-1 ${isReplay ? 'bg-blue-600' : 'bg-[#ea384c]'} hover:${isReplay ? 'bg-blue-600/90' : 'bg-[#ea384c]/90'} text-white shadow-sm`}
                >
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>{isReplay ? 'REPLAY' : 'LIVE'}</span>
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{viewerCount} spectateurs</span>
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
                className={`bg-primary/10 hover:bg-primary/20 ${isFavorite ? 'text-[#ea384c]' : 'text-primary'} transition-colors`}
                onClick={handleToggleFavorite}
              >
                <Heart className={`h-6 w-6 ${isFavorite ? "fill-[#ea384c]" : ""} transition-colors`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                onClick={onToggleChat}
              >
                <MessageSquare className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                onClick={handleClose}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            {!isMobile && (
              <>
                <Badge 
                  variant="secondary" 
                  className="bg-accent text-accent-foreground shadow-sm"
                >
                  {offerCount} offres
                </Badge>
                <p className="text-lg font-bold whitespace-nowrap text-primary">
                  {property.price.toLocaleString()} DH
                </p>
              </>
            )}
            <Button 
              className={cn(
                "bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap shadow-sm transition-all hover:shadow-md",
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
                className="bg-accent text-accent-foreground shadow-sm"
              >
                {offerCount} offres
              </Badge>
              <p className="text-lg font-bold whitespace-nowrap text-primary">
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