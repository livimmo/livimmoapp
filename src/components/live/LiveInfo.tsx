import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { LiveOfferDialog } from "./LiveOfferDialog";

interface LiveInfoProps {
  property: Property;
  onMakeOffer: () => void;
  viewerCount: number;
}

export const LiveInfo = ({ property, viewerCount }: LiveInfoProps) => {
  return (
    <Card className="p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold line-clamp-1">{property.title}</h2>
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4" />
          <span>{viewerCount} spectateurs</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-2xl font-bold">
          {property.price.toLocaleString()} DH
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {property.description}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        <LiveOfferDialog 
          title={property.title}
          price={property.price}
          isOpen={false}
          onClose={() => {}}
        />
        
        <Link 
          to={`/properties/${property.id}`}
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          Voir plus de détails
        </Link>
      </div>
    </Card>
  );
};