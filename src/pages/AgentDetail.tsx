import { useParams } from "react-router-dom";
import { mockAgents } from "@/data/mockAgents";
import { AgentHeader } from "@/components/agent/AgentHeader";
import { AgentProperties } from "@/components/agent/AgentProperties";
import { AgentStats } from "@/components/agent/AgentStats";
import { AgentLives } from "@/components/agent/AgentLives";
import { Mail, Phone, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AgentDetail = () => {
  const { id } = useParams();
  const agent = mockAgents.find(agent => agent.id === id);

  if (!agent) {
    return <div>Agent not found</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <AgentHeader agent={agent} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <span>{agent.email}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span>{agent.phone}</span>
          </div>

          {agent.social?.facebook && (
            <div className="flex items-center gap-2">
              <Facebook className="w-5 h-5" />
              <a href={agent.social.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </div>
          )}

          {agent.social?.instagram && (
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              <a href={agent.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          )}

          {agent.social?.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-5 h-5" />
              <a href={agent.social.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        <AgentProperties agent={agent} />
        <AgentStats agent={agent} />
        <AgentLives agent={agent} />
      </div>
    </div>
  );
};

export default AgentDetail;