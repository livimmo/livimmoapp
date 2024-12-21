import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export interface AgentCertificationBadgeProps {
  rating: number;
  showLevel?: boolean; // Ajout de la prop optionnelle
}

export const AgentCertificationBadge = ({ 
  rating, 
  showLevel = true 
}: AgentCertificationBadgeProps) => {
  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      <span>{rating.toFixed(1)}</span>
      {showLevel && <span className="text-xs">• Expert</span>}
    </Badge>
  );
};