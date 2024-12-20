import { Property } from "@/types/property";
import { VirtualTourCard } from "./VirtualTourCard";

interface VirtualToursSectionProps {
  properties: Property[];
  onPropertyHover?: (property: Property | null) => void;
}

export const VirtualToursSection = ({ properties, onPropertyHover }: VirtualToursSectionProps) => {
  const virtualTourProperties = properties.filter(
    (property) => property.virtualTour?.enabled
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Visites virtuelles</h2>
      <div className="grid grid-cols-1 gap-4">
        {virtualTourProperties.map((property) => (
          <div
            key={property.id}
            onMouseEnter={() => onPropertyHover?.(property)}
            onMouseLeave={() => onPropertyHover?.(null)}
          >
            <VirtualTourCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};