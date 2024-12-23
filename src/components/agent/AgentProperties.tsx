import { type Agent } from "@/types/agent";
import { type Property } from "@/types/property";

export interface AgentPropertiesProps {
  agent: Agent;
  properties: Property[];
}

export const AgentProperties = ({ agent, properties }: AgentPropertiesProps) => {
  return (
    <div>
      <h2>{agent.name}'s Properties</h2>
      <div>
        {properties.map(property => (
          <div key={property.id}>
            <h3>{property.title}</h3>
            <p>{property.location}</p>
            <p>{property.price.toLocaleString()} MAD</p>
          </div>
        ))}
      </div>
    </div>
  );
};
