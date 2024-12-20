import { Property } from "@/types/property";
import { VirtualTourCard } from "./VirtualTourCard";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface VirtualToursSectionProps {
  properties: Property[];
}

export const VirtualToursSection = ({ properties }: VirtualToursSectionProps) => {
  const propertiesWithVirtualTours = properties.filter(
    (property) => property.virtualTour?.enabled
  );

  if (propertiesWithVirtualTours.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Visites Virtuelles</h2>
        <div className="bg-accent rounded-lg p-8 text-center">
          <Eye className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Aucune visite virtuelle disponible pour le moment
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Visites Virtuelles</h2>
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Toutes les visites
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {propertiesWithVirtualTours.map((property) => (
          <VirtualTourCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};