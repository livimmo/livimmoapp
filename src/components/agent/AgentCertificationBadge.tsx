import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getBadgeForAgent } from "@/utils/agentBadge";

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
    <Badge 
      variant="outline" 
      className={cn(
        "flex items-center gap-1.5",
        badge.color,
        badge.textColor,
        badge.borderColor,
        className
      )}
    >
      <Award className="w-3.5 h-3.5" />
      <span>Agent Certifié{showLevel ? ` ${badge.level}` : ''}</span>
    </Badge>
  );
};