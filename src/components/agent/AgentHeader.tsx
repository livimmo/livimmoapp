import { Agent } from "@/types/agent";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ratings/StarRating";
import { MapPin } from "lucide-react";

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
            <Badge variant="secondary" className="w-fit">
              Vérifié
            </Badge>
          )}
        </div>
        
        {agent.company && (
          <p className="text-gray-600">{agent.company}</p>
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