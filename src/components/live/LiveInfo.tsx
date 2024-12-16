import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, ExternalLink, Heart, Radio, ChevronDown, ChevronUp, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { LiveOfferDialog } from "./LiveOfferDialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/property/FavoriteButton";
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
      w-full mx-auto
      transition-all duration-300
      ${isCollapsed ? 'h-[72px]' : ''}
      overflow-hidden
      flex flex-col
      fixed bottom-0 left-0 right-0
      ${isMobile ? 'max-h-[40vh]' : 'max-h-[30vh]'}
      z-50
    `}>
      <div className="flex items-center justify-end mb-2">
        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-6 hover:bg-accent flex items-center gap-1 text-xs"
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

      <div className="space-y-1.5 w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {property.images && property.images[0] && (
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-12 h-12 object-cover rounded-md"
              />
            )}
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="text-base font-semibold truncate">{property.title}</h2>
              <Badge 
                variant="default" 
                className="flex items-center gap-1 bg-[#ea384c] hover:bg-[#ea384c]/90 shrink-0"
              >
                <Radio className="w-3 h-3" />
                <span>LIVE</span>
              </Badge>
            </div>
          </div>
          <FavoriteButton 
            propertyId={property.id}
            title={property.title}
            className="shrink-0"
          />
        </div>
        
        {!isCollapsed && (
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4 mt-3`}>
            <div className="space-y-2">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{viewerCount} spectateurs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge 
                    variant="secondary" 
                    className="bg-[#F97316] text-white hover:bg-[#F97316]/90"
                  >
                    {offerCount} offres
                  </Badge>
                </div>
              </div>

              <p className="text-lg font-bold">
                {property.price.toLocaleString()} DH
              </p>

              <Link 
                to={`/properties/${property.id}`}
                className="flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Voir plus de détails
              </Link>
            </div>

            <div className="flex justify-end">
              <Button 
                size="sm"
                className="w-auto" 
                onClick={() => setIsOfferDialogOpen(true)}
              >
                <Heart className="w-4 h-4 mr-1.5" />
                Je suis intéressé(e)
              </Button>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="flex items-center justify-between gap-4">
            <p className="font-semibold">{property.price.toLocaleString()} DH</p>
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className="bg-[#F97316] text-white hover:bg-[#F97316]/90"
              >
                {offerCount} offres
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 hover:bg-accent"
                onClick={() => setIsOfferDialogOpen(true)}
              >
                <ThumbsUp className="w-4 h-4 mr-1.5" />
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