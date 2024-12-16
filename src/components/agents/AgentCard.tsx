import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Building2, Star } from "lucide-react";
import { StarRating } from "@/components/ratings/StarRating";

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    image: string;
    isVerified?: boolean;
    description?: string;
    projectCount?: number;
  };
  isDeveloper?: boolean;
  onClick?: () => void;
}

export const AgentCard = ({ agent, isDeveloper, onClick }: AgentCardProps) => {
  return (
    <Card
      className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={agent.image} alt={agent.name} />
          <AvatarFallback>{agent.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold">{agent.name}</h3>
            <div className="flex gap-1">
              {agent.isVerified && (
                <Badge variant="secondary" className="gap-1">
                  <BadgeCheck className="h-4 w-4" />
                  Vérifié
                </Badge>
              )}
              {isDeveloper && (
                <Badge variant="outline" className="gap-1">
                  <Building2 className="h-4 w-4" />
                  Promoteur
                </Badge>
              )}
            </div>
          </div>
          
          {isDeveloper ? (
            <>
              <p className="text-sm text-muted-foreground mb-2">
                {agent.description}
              </p>
              <p className="text-sm">
                {agent.projectCount} projets en cours
              </p>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <StarRating rating={4.5} totalReviews={12} />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};