import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, ExternalLink, Heart, Radio, MessageSquare, X, Maximize2, Minimize2 } from "lucide-react";
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

  return (
    <Card className={cn(
      "p-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "transition-all duration-300",
      "h-auto",
      "overflow-hidden",
      "flex flex-col",
      "fixed bottom-[64px] left-0 right-0",
      isMobile ? 'max-h-[30vh]' : 'max-h-[20vh]',
      "z-50",
      "border-t border-border/50",
      isFullscreen && "z-[9999]"
    )}>
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-12 w-20 bg-gray-200 rounded-md overflow-hidden shrink-0 flex items-center justify-center">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <Link 
                to={`/properties/${property.id}`}
                className="hover:underline flex items-center gap-2"
              >
                <h2 className="text-base font-semibold truncate">{property.title}</h2>
                <ExternalLink className="w-3.5 h-3.5 text-primary shrink-0" />
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="default" 
                  className={`flex items-center gap-1 ${isReplay ? 'bg-blue-600' : 'bg-[#ea384c]'} hover:${isReplay ? 'bg-blue-600/90' : 'bg-[#ea384c]/90'} text-white`}
                >
                  <Radio className="w-3 h-3" />
                  <span>{isReplay ? 'REPLAY' : 'LIVE'}</span>
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{viewerCount} spectateurs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={`bg-primary/10 hover:bg-primary/20 ${isFavorite ? 'text-[#ea384c]' : 'text-primary'}`}
                onClick={handleToggleFavorite}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-[#ea384c]" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary/10 text-primary hover:bg-primary/20"
                onClick={onToggleChat}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary/10 text-primary hover:bg-primary/20"
                onClick={onToggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary/10 text-primary hover:bg-primary/20"
                onClick={() => navigate(-1)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Badge 
              variant="secondary" 
              className="bg-accent text-accent-foreground"
            >
              {offerCount} offres
            </Badge>
            <p className="text-lg font-bold whitespace-nowrap">
              {property.price.toLocaleString()} DH
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap" 
              onClick={() => setIsOfferDialogOpen(true)}
            >
              <Heart className="w-4 h-4 mr-1.5" />
              Je suis intéressé(e)
            </Button>
          </div>
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