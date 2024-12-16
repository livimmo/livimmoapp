import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, ExternalLink, Heart, Radio, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
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
}

export const LiveInfo = ({ property, viewerCount, onToggleChat }: LiveInfoProps) => {
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
      <div className="flex items-center justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-6 hover:bg-[#E5DEFF] text-[#9b87f5] flex items-center gap-1 text-xs"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <>
              <span>Afficher</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Réduire</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-12 w-16 bg-gray-200 rounded overflow-hidden shrink-0">
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
                <ExternalLink className="w-3.5 h-3.5 text-[#9b87f5] shrink-0" />
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="default" 
                  className="flex items-center gap-1 bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                >
                  <Radio className="w-3 h-3" />
                  <span>LIVE</span>
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{viewerCount} spectateurs</span>
                </div>
              </div>
            </div>
          </div>

          {!isCollapsed && (
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-[#E5DEFF] text-[#9b87f5] hover:bg-[#D3E4FD]"
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-[#9b87f5] text-[#9b87f5]" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-[#E5DEFF] text-[#9b87f5] hover:bg-[#D3E4FD]"
                  onClick={onToggleChat}
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
              <Badge 
                variant="secondary" 
                className="bg-[#FFDEE2] hover:bg-[#FFDEE2] text-[#9b87f5]"
              >
                {offerCount} offres
              </Badge>
              <p className="text-lg font-bold whitespace-nowrap">
                {property.price.toLocaleString()} DH
              </p>
              <Button 
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white whitespace-nowrap" 
                onClick={() => setIsOfferDialogOpen(true)}
              >
                <Heart className="w-4 h-4 mr-1.5" />
                Je suis intéressé(e)
              </Button>
            </div>
          )}
        </div>

        {isCollapsed && (
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-4">
              <p className="font-semibold">{property.price.toLocaleString()} DH</p>
              <Badge 
                variant="secondary" 
                className="bg-[#FFDEE2] hover:bg-[#FFDEE2] text-[#9b87f5]"
              >
                {offerCount} offres
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 bg-[#E5DEFF] text-[#9b87f5] hover:bg-[#D3E4FD]"
                onClick={handleToggleFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-[#9b87f5] text-[#9b87f5]" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 bg-[#E5DEFF] text-[#9b87f5] hover:bg-[#D3E4FD]"
                onClick={onToggleChat}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
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