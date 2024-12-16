import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, ExternalLink, Heart, Radio, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { LiveOfferDialog } from "./LiveOfferDialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface LiveInfoProps {
  property: Property;
  onMakeOffer: () => void;
  viewerCount: number;
}

export const LiveInfo = ({ property, viewerCount }: LiveInfoProps) => {
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [offerCount] = useState(12);
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          className="p-1 h-6 hover:bg-accent/50 flex items-center gap-1 text-xs"
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
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-8 w-12 bg-gray-200 rounded overflow-hidden shrink-0">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <Link 
              to={`/properties/${property.id}`}
              className="hover:underline flex items-center gap-2"
            >
              <h2 className="text-base font-semibold truncate">{property.title}</h2>
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
            </Link>
            <Badge 
              variant="default" 
              className="flex items-center gap-1 bg-[#ea384c]/90 hover:bg-[#ea384c] text-white shrink-0"
            >
              <Radio className="w-3 h-3" />
              <span>LIVE</span>
            </Badge>
          </div>
        </div>
        
        {!isCollapsed && (
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{viewerCount} spectateurs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge 
                    variant="secondary" 
                    className="bg-[#F97316]/90 hover:bg-[#F97316] text-white"
                  >
                    {offerCount} offres
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-lg font-bold">
                  {property.price.toLocaleString()} DH
                </p>
                <Button 
                  size="sm"
                  className="bg-primary/90 hover:bg-primary" 
                  onClick={() => setIsOfferDialogOpen(true)}
                >
                  <Heart className="w-4 h-4 mr-1.5" />
                  Je suis intéressé(e)
                </Button>
              </div>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="font-semibold">{property.price.toLocaleString()} DH</p>
              <Badge 
                variant="secondary" 
                className="bg-[#F97316]/90 hover:bg-[#F97316] text-white"
              >
                {offerCount} offres
              </Badge>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 hover:bg-accent/50"
              onClick={() => setIsOfferDialogOpen(true)}
            >
              <Heart className="w-4 h-4 mr-1.5" />
              <span className="text-sm">Intéressé</span>
            </Button>
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