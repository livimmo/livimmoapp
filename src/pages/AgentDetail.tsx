import { useParams } from "react-router-dom";
import { AgentHeader } from "@/components/agent/AgentHeader";
import { mockAgents } from "@/data/mockAgents";
import { Badge } from "@/components/ui/badge";

export const AgentDetail = () => {
  const { id } = useParams();
  const agent = mockAgents.find(a => a.id === id);
  
  if (!agent) {
    return <div>Agent not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AgentHeader agent={agent} />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span>{agent.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span>{agent.phone}</span>
              </div>
              {agent.social?.facebook && (
                <div className="flex items-center gap-2">
                  <Facebook className="w-5 h-5 text-muted-foreground" />
                  <a href={agent.social.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </div>
              )}
              {agent.social?.instagram && (
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-muted-foreground" />
                  <a href={agent.social.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </div>
              )}
              {agent.social?.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-muted-foreground" />
                  <a href={agent.social.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>

          {agent.specialties && agent.specialties.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Spécialités</h2>
              <div className="flex flex-wrap gap-2">
                {agent.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <AgentProperties agent={agent} />
        </div>

        <div>
          <AgentStats agent={agent} />
          <AgentLives agent={agent} />
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
