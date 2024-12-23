import { type Agent } from "@/types/agent";

interface AgentLivesProps {
  agent: Agent;
}

export const AgentLives = ({ agent }: AgentLivesProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Lives ({agent.completedLives || 0})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Live content will be implemented later */}
        <div className="text-muted-foreground">Aucun live disponible pour le moment</div>
      </div>
    </div>
  );
};