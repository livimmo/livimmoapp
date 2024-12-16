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
      p-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
      transition-all duration-300
      ${isCollapsed ? 'h-[64px]' : 'h-auto'}
      overflow-hidden
      flex flex-col
      fixed bottom-[64px] left-0 right-0
      ${isMobile ? 'max-h-[35vh]' : 'max-h-[25vh]'}
      z-50
      border-t border-border/50
    `}>
      <div className="flex items-center justify-end mb-1">
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

      <div className="space-y-1 w-full max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <h2 className="text-base font-semibold truncate">{property.title}</h2>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                <p className="text-lg font-bold">
                  {property.price.toLocaleString()} DH
                </p>
                <Button 
                  size="sm"
                  className="w-full sm:w-auto bg-primary/90 hover:bg-primary" 
                  onClick={() => setIsOfferDialogOpen(true)}
                >
                  <Heart className="w-4 h-4 mr-1.5" />
                  Je suis intéressé(e)
                </Button>
              </div>

              <Link 
                to={`/properties/${property.id}`}
                className="flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Voir plus de détails
              </Link>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <p className="font-semibold">{property.price.toLocaleString()} DH</p>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 hover:bg-accent/50 w-full sm:w-auto"
                onClick={() => setIsOfferDialogOpen(true)}
              >
                <Heart className="w-4 h-4 mr-1.5" />
                <span className="text-sm">Intéressé</span>
              </Button>
            </div>
            <div>
              <Badge 
                variant="secondary" 
                className="bg-[#F97316]/90 hover:bg-[#F97316] text-white"
              >
                {offerCount} offres
              </Badge>
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