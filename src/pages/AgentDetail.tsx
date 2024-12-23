import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Agent } from "@/types/agent";
import { mockAgents } from "@/data/mockAgents";
import { AgentProperties } from "@/components/agent/AgentProperties";
import { AgentLives } from "@/components/agent/AgentLives";

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    const foundAgent = mockAgents.find(agent => agent.id === id);
    if (foundAgent) {
      setAgent(foundAgent);
    }
  }, [id]);

  if (!agent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold">{agent.name}</h1>
      <div className="flex items-center gap-4">
        <img src={agent.avatar} alt={agent.name} className="w-16 h-16 rounded-full" />
        <div>
          <p className="text-sm text-gray-500">{agent.location}</p>
          <p className="text-sm text-gray-500">{agent.email}</p>
          <p className="text-sm text-gray-500">{agent.phone}</p>
        </div>
      </div>

      <AgentProperties agent={agent} />
      <AgentLives agent={agent} />
    </div>
  );
};

export default AgentDetail;
