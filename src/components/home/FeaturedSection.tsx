import { PropertyCard } from "@/components/PropertyCard";
import { type Property } from "@/types/property";

interface FeaturedSectionProps {
  properties: Property[];
}

export const FeaturedSection = ({ properties }: FeaturedSectionProps) => {
  return (
    <section className="mb-12">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-2xl font-bold text-primary">
          Notre sélection de la semaine
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Découvrez nos biens en live cette semaine et inscrivez-vous dès maintenant pour une visite exclusive
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </section>
  );
};