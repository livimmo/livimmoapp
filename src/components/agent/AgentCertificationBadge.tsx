import { CheckCircle2, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type BadgeLevel, getBadgeForAgent } from "@/utils/agentBadge";

interface AgentCertificationBadgeProps {
  rating: number;
  showLevel?: boolean;
  className?: string;
}

export const AgentCertificationBadge = ({ 
  rating,
  showLevel = true,
  className 
}: AgentCertificationBadgeProps) => {
  const badge = getBadgeForAgent(rating);
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Badge 
        variant="secondary" 
        className="flex items-center gap-1 text-primary"
      >
        <CheckCircle2 className="h-3 w-3" />
        <span className="text-xs">Agent Certifié</span>
      </Badge>
      
      {showLevel && (
        <Badge 
          variant="outline" 
          className={cn(
            "flex items-center gap-1 border",
            badge.color,
            badge.textColor,
            badge.borderColor
          )}
        >
          <Award className="h-3 w-3" />
          <span className="text-xs">{badge.level}</span>
        </Badge>
      )}
    </div>
  );
};