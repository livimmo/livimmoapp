import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, ExternalLink, Heart, Radio, Euro } from "lucide-react";
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

  return (
    <Card className={`
      p-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
      ${isMobile ? 'max-w-[calc(100%-2rem)] mx-auto' : 'max-w-md'}
      transition-all duration-300
    `}>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
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
          <FavoriteButton 
            propertyId={property.id}
            title={property.title}
            className="shrink-0"
          />
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>{viewerCount} spectateurs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Euro className="w-3.5 h-3.5" />
            <Badge 
              variant="secondary" 
              className="bg-[#F97316] text-white hover:bg-[#F97316]/90"
            >
              {offerCount} offres
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-3 mt-3">
        <p className="text-lg font-bold">
          {property.price.toLocaleString()} DH
        </p>
        <Button 
          size="sm"
          className="shrink-0" 
          onClick={() => setIsOfferDialogOpen(true)}
        >
          <Heart className="w-4 h-4 mr-1.5" />
          Je suis intéressé(e)
        </Button>
      </div>

      <Link 
        to={`/properties/${property.id}`}
        className="flex items-center gap-1.5 text-xs text-primary hover:underline mt-2"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        Voir plus de détails
      </Link>

      <LiveOfferDialog 
        title={property.title}
        price={property.price}
        isOpen={isOfferDialogOpen}
        onClose={() => setIsOfferDialogOpen(false)}
      />
    </Card>
  );
};