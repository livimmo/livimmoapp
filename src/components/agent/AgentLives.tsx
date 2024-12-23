import { type Agent } from "@/types/agent";

interface AgentLivesProps {
  agent: Agent;
}

export const AgentLives = ({ agent }: AgentLivesProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Lives programmés</h2>
      <div className="text-gray-500">
        Aucun live programmé pour le moment
      </div>
    </div>
  );
};