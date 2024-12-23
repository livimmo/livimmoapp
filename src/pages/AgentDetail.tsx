import { useParams } from "react-router-dom";
import { Agent } from "@/types/agent";
import { AgentHeader } from "@/components/agent/AgentHeader";
import { AgentStats } from "@/components/agent/AgentStats";
import { AgentProperties } from "@/components/agents/AgentProperties";
import { AgentLives } from "@/components/agents/AgentLives";
import { mockAgents } from "@/data/mockAgents";
import { mockProperties } from "@/data/mockProperties";

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const agent = mockAgents.find((agent) => agent.id === id) as Agent;

  if (!agent) {
    return <div>Agent not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AgentHeader agent={agent} />
      <div className="mt-8">
        <AgentStats agent={agent} />
      </div>
      <div className="mt-8 space-y-8">
        <AgentProperties agent={agent} properties={mockProperties} />
        <AgentLives agent={agent} />
      </div>
    </div>
  );
};

export default AgentDetail;
