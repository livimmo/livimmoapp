import { Building2, Video, CheckCircle } from "lucide-react";

interface AgentStatsProps {
  activeProperties: number;
  completedLives: number;
  soldProperties: number;
}

export const AgentStats = ({
  activeProperties,
  completedLives,
  soldProperties,
}: AgentStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col items-center p-4 rounded-lg border bg-card">
        <Building2 className="h-5 w-5 mb-2 text-primary" />
        <span className="text-lg font-semibold">{activeProperties}</span>
        <span className="text-sm text-muted-foreground">Biens actifs</span>
      </div>
      
      <div className="flex flex-col items-center p-4 rounded-lg border bg-card">
        <Video className="h-5 w-5 mb-2 text-primary" />
        <span className="text-lg font-semibold">{completedLives}</span>
        <span className="text-sm text-muted-foreground">Lives réalisés</span>
      </div>
      
      <div className="flex flex-col items-center p-4 rounded-lg border bg-card">
        <CheckCircle className="h-5 w-5 mb-2 text-primary" />
        <span className="text-lg font-semibold">{soldProperties}</span>
        <span className="text-sm text-muted-foreground">Biens vendus</span>
      </div>
    </div>
  );
};