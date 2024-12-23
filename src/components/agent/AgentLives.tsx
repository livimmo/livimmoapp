import { Agent } from "@/types/agent";

interface AgentLivesProps {
  agent: Agent;  // Added agent prop
}

export const AgentLives = ({ agent }: AgentLivesProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Lives programmés</h2>
      {/* Example content for agent lives */}
      <ul>
        <li>Live 1 - {agent.name}</li>
        <li>Live 2 - {agent.name}</li>
        <li>Live 3 - {agent.name}</li>
      </ul>
    </div>
  );
};
