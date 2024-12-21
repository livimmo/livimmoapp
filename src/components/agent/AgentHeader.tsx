import { Agent } from "@/types/agent";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ratings/StarRating";
import { MapPin, Building } from "lucide-react";
import { AgentCertificationBadge } from "./AgentCertificationBadge";

interface AgentHeaderProps {
  agent: Agent;
}

export const AgentHeader = ({ agent }: AgentHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <h1 className="text-2xl font-bold">{agent.name}</h1>
          {agent.verified && (
            <AgentCertificationBadge rating={agent.rating} />
          )}
        </div>
        
        {agent.company && (
          <div className="flex items-center gap-3 text-gray-600">
            <Building className="w-4 h-4" />
            <div className="flex items-center gap-2">
              {agent.companyLogo && (
                <img 
                  src={agent.companyLogo} 
                  alt={agent.company} 
                  className="w-8 h-8 object-contain"
                />
              )}
              <span>{agent.company}</span>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{agent.location}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <StarRating rating={agent.rating} totalReviews={agent.totalReviews} />
        </div>
      </div>
    </div>
  );
};