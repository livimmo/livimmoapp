import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, ExternalLink, Euro } from "lucide-react";
import { Link } from "react-router-dom";
import { LiveOfferDialog } from "./LiveOfferDialog";
import { useState } from "react";

interface LiveInfoProps {
  property: Property;
  onMakeOffer: () => void;
  viewerCount: number;
}

export const LiveInfo = ({ property, viewerCount }: LiveInfoProps) => {
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);

  return (
    <Card className="p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold line-clamp-1">{property.title}</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{viewerCount} spectateurs</span>
        </div>
      </div>
      
      <div className="space-y-2 mt-4">
        <p className="text-2xl font-bold">
          {property.price.toLocaleString()} DH
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {property.description}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        <Button 
          className="w-full" 
          onClick={() => setIsOfferDialogOpen(true)}
        >
          <Euro className="w-4 h-4" />
          Proposer un prix
        </Button>
        
        <Link 
          to={`/properties/${property.id}`}
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          Voir plus de détails
        </Link>

        <LiveOfferDialog 
          title={property.title}
          price={property.price}
          isOpen={isOfferDialogOpen}
          onClose={() => setIsOfferDialogOpen(false)}
        />
      </div>
    </Card>
  );
};