import { type Agent } from "@/types/agent";
import { type Property } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";

export interface AgentPropertiesProps {
  agent: Agent;
  properties: Property[];
}

export const AgentProperties = ({ agent, properties }: AgentPropertiesProps) => {
  const agentProperties = properties.filter(property => property.agent.id === agent.id);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Propriétés ({agentProperties.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agentProperties.map(property => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
};