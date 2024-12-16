import { Agent } from "@/types/agent";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ratings/StarRating";
import { Building2, Video, Calendar, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

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
          <Badge className="absolute top-2 right-2 bg-primary">
            <UserCheck className="w-4 h-4 mr-1" />
            Vérifié
          </Badge>
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
        <StarRating rating={agent.rating} totalReviews={agent.totalReviews} />
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {agent.description}
        </p>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Building2 className="w-4 h-4" />
            <span>{agent.activeProperties}</span>
          </div>
          <div className="flex items-center gap-1">
            <Video className="w-4 h-4" />
            <span>{agent.completedLives}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{agent.scheduledLives}</span>
          </div>
        </div>
        <Link to={`/agent/${agent.id}`}>
          <Button className="w-full">Voir le profil</Button>
        </Link>
      </CardContent>
    </Card>
  );
};