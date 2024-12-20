import { Agent } from "@/types/agent";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AgentRating } from "@/components/ratings/AgentRating";
import { AgentStats } from "@/components/agents/AgentStats";
import { UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { AgentCertificationBadge } from "../agent/AgentCertificationBadge";

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={agent.avatar}
          alt={agent.name}
          className="w-full h-full object-cover"
        />
        {agent.verified && (
          <AgentCertificationBadge 
            rating={agent.rating} 
            className="absolute top-2 right-2"
          />
        )}
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">{agent.name}</h3>
            {agent.company && (
              <p className="text-sm text-muted-foreground">{agent.company}</p>
            )}
            <p className="text-sm text-muted-foreground">{agent.location}</p>
          </div>
          <Badge variant={agent.type === "agent" ? "default" : "secondary"}>
            {agent.type === "agent" ? "Agent" : "Promoteur"}
          </Badge>
        </div>
        <AgentRating 
          rating={agent.rating} 
          totalReviews={agent.totalReviews}
          showBadge 
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {agent.description}
        </p>
        <AgentStats
          activeProperties={agent.activeProperties}
          completedLives={agent.completedLives}
          soldProperties={agent.soldProperties || 0}
        />
        <Link to={`/agent/${agent.id}`}>
          <Button className="w-full">Voir le profil</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
