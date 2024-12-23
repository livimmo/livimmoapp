import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AgentCertificationBadge } from "../agent/AgentCertificationBadge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PropertyCardAgentProps {
  agent_id: string | null;
  district?: string;
}

export const PropertyCardAgent = ({ agent_id, district }: PropertyCardAgentProps) => {
  const navigate = useNavigate();

  const { data: agent } = useQuery({
    queryKey: ['agent', agent_id],
    queryFn: async () => {
      if (!agent_id) return null;
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', agent_id)
        .single();
      return data;
    },
    enabled: !!agent_id
  });

  const handleAgentClick = () => {
    if (agent_id) {
      navigate(`/agent/${agent_id}`);
    }
  };

  if (!agent) return null;

  return (
    <div 
      className="px-4 py-3 border-t flex items-center justify-between bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={handleAgentClick}
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border border-gray-200">
          <AvatarImage src={agent.avatar_url} alt={agent.full_name} />
          <AvatarFallback>{agent.full_name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{agent.full_name}</span>
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