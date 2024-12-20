import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Property } from "@/types/property";
import { PropertyVirtualTourStats } from "./PropertyVirtualTourStats";
import { PropertyFloorPlan } from "./PropertyFloorPlan";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { PrivateVisitDialog } from "@/components/profile/PrivateVisitDialog";
import { useState } from "react";

interface PropertyDetailContentProps {
  property: Property;
}

export const PropertyDetailContent = ({ property }: PropertyDetailContentProps) => {
  const { user } = useAuth();
  const [showVisitDialog, setShowVisitDialog] = useState(false);
  const isBuyerOrTenant = user?.role === 'buyer' || user?.role === 'tenant';

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          {property.location}
        </div>
        {isBuyerOrTenant && (
          <Button 
            variant="outline"
            onClick={() => setShowVisitDialog(true)}
            className="ml-4"
          >
            Réserver une visite privée
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-accent rounded-lg">
          <div className="font-semibold">{property.surface} m²</div>
          <div className="text-sm text-muted-foreground">Surface</div>
        </div>
        <div className="p-4 bg-accent rounded-lg">
          <div className="font-semibold">{property.rooms}</div>
          <div className="text-sm text-muted-foreground">Pièces</div>
        </div>
        <div className="p-4 bg-accent rounded-lg">
          <div className="font-semibold">{property.bathrooms}</div>
          <div className="text-sm text-muted-foreground">Salle de bains</div>
        </div>
      </div>

      {property.virtualTour?.enabled && (
        <>
          <PropertyFloorPlan property={property} />
          <PropertyVirtualTourStats property={property} />
        </>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-muted-foreground whitespace-pre-line">{property.description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Équipements</h2>
        <div className="flex flex-wrap gap-2">
          {property.features.map((feature) => (
            <Badge key={feature} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      <PrivateVisitDialog 
        open={showVisitDialog} 
        onOpenChange={setShowVisitDialog} 
      />
    </div>
  );
};