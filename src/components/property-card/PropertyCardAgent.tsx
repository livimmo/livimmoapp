import { type Profile } from "@/types/database";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface PropertyCardAgentProps {
  agent?: Profile;
  district: string;
}

export const PropertyCardAgent = ({ agent, district }: PropertyCardAgentProps) => {
  if (!agent?.full_name) return null;

  const initials = agent.full_name
    ? agent.full_name.split(" ").map(n => n[0]).join("")
    : "A";

  return (
    <div className="p-4 border-t flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={agent.avatar_url || ""} alt={agent.full_name || ""} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{agent.full_name}</span>
          <span className="text-xs text-muted-foreground">{district}</span>
        </div>
      </div>
      {agent.verified && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          <span className="text-xs">Vérifié</span>
        </Badge>
      )}
    </div>
  );
};