import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, List, Map } from "lucide-react";
import { PropertyList } from "@/components/properties/PropertyList";
import { PropertyMap } from "@/components/search/PropertyMap";
import { type Property } from "@/types/property";

interface VirtualToursSectionProps {
  properties: Property[];
}

export const VirtualToursSection = ({ properties }: VirtualToursSectionProps) => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const propertiesWithVirtualTours = properties.filter(
    (property) => property.virtualTour?.enabled
  );

  if (propertiesWithVirtualTours.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Visites Virtuelles</h2>
        <p className="text-muted-foreground text-center py-8">
          Aucune visite virtuelle disponible pour le moment
        </p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Visites Virtuelles</h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-2" />
            Liste
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
          >
            <Map className="h-4 w-4 mr-2" />
            Carte
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <PropertyList properties={propertiesWithVirtualTours} viewMode="grid" />
      ) : (
        <div className="h-[500px] rounded-lg overflow-hidden">
          <PropertyMap properties={propertiesWithVirtualTours} />
        </div>
      )}
    </section>
  );
};