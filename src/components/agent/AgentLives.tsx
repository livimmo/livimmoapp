import { LiveCard } from "@/components/live/LiveCard";
import { LiveEvent } from "@/types/live";

interface AgentLivesProps {
  lives: LiveEvent[];
}

export const AgentLives = ({ lives }: AgentLivesProps) => {
  if (lives.length === 0) {
    return (
      <p className="col-span-full text-center text-muted-foreground py-8">
        Aucun live programmé pour le moment
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lives.map((live) => (
        <LiveCard key={live.id} {...live} />
      ))}
    </div>
  );
};