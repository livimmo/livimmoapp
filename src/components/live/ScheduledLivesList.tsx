import { LiveCard } from "./LiveCard";
import { LiveEvent } from "@/types/live";

interface ScheduledLivesListProps {
  lives: LiveEvent[];
}

export const ScheduledLivesList = ({ lives }: ScheduledLivesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lives.map((live) => (
        <LiveCard key={live.id} live={live} />
      ))}
    </div>
  );
};