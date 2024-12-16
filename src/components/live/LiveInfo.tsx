import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, ExternalLink, Heart, Radio, MessageSquare, Minimize2, Maximize2 } from "lucide-react";
import { Link } from "react-router-dom";
import { LiveOfferDialog } from "./LiveOfferDialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface LiveInfoProps {
  property: Property;
  onMakeOffer: () => void;
  viewerCount: number;
  onToggleChat?: () => void;
  isReplay?: boolean;
}

export const LiveInfo = ({ property, viewerCount, onToggleChat, isReplay }: LiveInfoProps) => {
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [offerCount] = useState(12);
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className={`
      p-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
      transition-all duration-300
      ${isCollapsed ? 'h-[56px]' : 'h-auto'}
      overflow-hidden
      flex flex-col
      fixed bottom-[64px] left-0 right-0
      ${isMobile ? 'max-h-[30vh]' : 'max-h-[20vh]'}
      z-50
      border-t border-border/50
    `}>
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-6 hover:bg-primary/10 text-primary flex items-center gap-1 text-xs"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <Maximize2 className="h-4 w-4" />
          ) : (
            <Minimize2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        {!isCollapsed && (
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
        )}

        {isCollapsed && (
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-4">
              <p className="font-semibold">{property.price.toLocaleString()} DH</p>
              <Badge 
                variant="secondary" 
                className="bg-accent text-accent-foreground"
              >
                {offerCount} offres
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 bg-primary/10 hover:bg-primary/20 ${isFavorite ? 'text-[#ea384c]' : 'text-primary'}`}
                onClick={handleToggleFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-[#ea384c]" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 bg-primary/10 text-primary hover:bg-primary/20"
                onClick={onToggleChat}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                className="h-8 px-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setIsOfferDialogOpen(true)}
              >
                <Heart className="w-4 h-4 mr-1.5" />
                <span className="text-sm">Intéressé</span>
              </Button>
            </div>
          </div>
        )}
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