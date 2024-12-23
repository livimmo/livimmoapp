import { useParams } from "react-router-dom";
import { mockAgents } from "@/data/mockAgents";
import { AgentHeader } from "@/components/agent/AgentHeader";
import { AgentStats } from "@/components/agent/AgentStats";
import { AgentProperties } from "@/components/agent/AgentProperties";
import { AgentLives } from "@/components/agent/AgentLives";
import { Mail, Phone, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AgentDetail = () => {
  const { id } = useParams();
  const agent = mockAgents.find(a => a.id === id);

  if (!agent) {
    return <div>Agent non trouvé</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
      <AgentHeader agent={agent} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          {agent.email}
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          {agent.phone}
        </Button>

        {agent.social?.facebook && (
          <Button variant="outline" className="flex items-center gap-2">
            <Facebook className="w-4 h-4" />
            Facebook
          </Button>
        )}

        {agent.social?.instagram && (
          <Button variant="outline" className="flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Instagram
          </Button>
        )}

        {agent.social?.linkedin && (
          <Button variant="outline" className="flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </Button>
        )}
      </div>

      {agent.description && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">À propos</h2>
          <p className="text-gray-600">{agent.description}</p>
        </div>
      )}

      {agent.specialties && agent.specialties.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Spécialités</h2>
          <div className="flex flex-wrap gap-2">
            {agent.specialties.map((specialty, index) => (
              <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}

      <AgentProperties agent={agent} />
      <AgentStats agent={agent} />
      <AgentLives agent={agent} />
    </div>
  );
};

export default AgentDetail;