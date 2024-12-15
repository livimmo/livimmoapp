import { PropertyCard } from "@/components/PropertyCard";
import { type Property } from "@/types/property";

interface LiveSectionProps {
  properties: Property[];
}

export const LiveSection = ({ properties }: LiveSectionProps) => {
  // Filtrer pour ne garder que les propriétés en direct
  const liveProperties = properties.filter((property) => property.isLiveNow);

  if (liveProperties.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Lives en cours</h2>
        <p className="text-muted-foreground text-center py-8">
          Aucun live en cours pour le moment
        </p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Lives en cours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {liveProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </section>
  );
};