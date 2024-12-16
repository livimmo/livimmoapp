import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PropertyDetailContentProps {
  property: any;
}

export const PropertyDetailContent = ({ property }: PropertyDetailContentProps) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="flex items-center text-muted-foreground">
        <MapPin className="h-4 w-4 mr-2" />
        {property.location}
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

      <div>
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <ScrollArea className="h-[200px] rounded-md border p-4">
          <p className="text-muted-foreground leading-relaxed">
            {property.description}
          </p>
        </ScrollArea>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Équipements</h2>
        <div className="flex flex-wrap gap-2">
          {property.features.map((feature: string) => (
            <Badge key={feature} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};