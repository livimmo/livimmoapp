import { Agent } from "@/types/agent";
import { Building2, Video, Calendar, CheckCircle } from "lucide-react";

interface AgentStatsProps {
  agent: Agent;
}

export const AgentStats = ({ agent }: AgentStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex items-center gap-3 p-4 rounded-lg border">
        <Building2 className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Biens actifs</p>
          <p className="font-semibold">{agent.activeProperties}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 p-4 rounded-lg border">
        <Video className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Lives réalisés</p>
          <p className="font-semibold">{agent.completedLives}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 p-4 rounded-lg border">
        <Calendar className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Lives programmés</p>
          <p className="font-semibold">{agent.scheduledLives || 0}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-lg border">
        <CheckCircle className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Biens vendus</p>
          <p className="font-semibold">{agent.soldProperties || 0}</p>
        </div>
      </div>
    </div>
  );
};