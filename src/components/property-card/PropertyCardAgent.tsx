import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AgentCertificationBadge } from "../agent/AgentCertificationBadge";

interface PropertyCardAgentProps {
  agent: {
    id?: number;
    name: string;
    image: string;
    company?: string;
    verified?: boolean;
  };
  district?: string;
}

export const PropertyCardAgent = ({ agent, district }: PropertyCardAgentProps) => {
  const navigate = useNavigate();

  const handleAgentClick = () => {
    if (agent.id) {
      navigate(`/agent/${agent.id}`);
    }
  };

  return (
    <div 
      className="px-4 py-3 border-t flex items-center justify-between bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={handleAgentClick}
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border border-gray-200">
          <AvatarImage src={agent.image} alt={agent.name} />
          <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{agent.name}</span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">{agent.company || 'Agent indépendant'}</span>
            {district && (
              <>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{district}</span>
              </>
            )}
          </div>
        </div>
      </div>
      {agent.verified && (
        <AgentCertificationBadge rating={4.8} showLevel={false} />
      )}
    </div>
  );
};