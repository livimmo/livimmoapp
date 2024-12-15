import { PropertyCard } from "@/components/PropertyCard";

interface LiveProperty {
  id: number;
  image: string;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  hasLive?: boolean;
  viewers?: number;
  tags?: string[];
}

interface LiveSectionProps {
  properties: LiveProperty[];
}

export const LiveSection = ({ properties }: LiveSectionProps) => {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Lives en cours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </section>
  );
};