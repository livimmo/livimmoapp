import { PropertyCard } from "@/components/PropertyCard";
import { Property } from "@/types/property";
import { Agent } from "@/types/agent";

interface AgentPropertiesProps {
  properties: Property[];
  agent: Agent;  // Added agent prop
}

export const AgentProperties = ({ properties, agent }: AgentPropertiesProps) => {
  if (properties.length === 0) {
    return (
      <p className="col-span-full text-center text-muted-foreground py-8">
        Aucun bien actif pour le moment
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
};