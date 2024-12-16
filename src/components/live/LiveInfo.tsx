import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { LiveOfferDialog } from "./LiveOfferDialog";
import { useState } from "react";
import { OfferDialog } from "../property/OfferDialog";

interface LiveInfoProps {
  property: Property;
  onMakeOffer: () => void;
  viewerCount: number;
}

export const LiveInfo = ({ property, viewerCount }: LiveInfoProps) => {
  const [showOfferDialog, setShowOfferDialog] = useState(false);

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

      <div className="grid grid-cols-2 gap-2 mt-4">
        <LiveOfferDialog
          title={property.title}
          price={property.price}
          isOpen={showOfferDialog}
          onClose={() => setShowOfferDialog(false)}
        />
        <Button 
          onClick={() => setShowOfferDialog(true)}
          className="w-full"
        >
          Faire une offre
        </Button>
        <OfferDialog 
          title={property.title}
          price={property.price}
        />
      </div>
    </Card>
  );
};