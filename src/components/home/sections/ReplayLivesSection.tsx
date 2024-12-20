import { LiveEvent } from "@/types/live";
import { Badge } from "@/components/ui/badge";
import { LiveSlider } from "@/components/live/LiveSlider";

interface ReplayLivesSectionProps {
  replayLives: LiveEvent[];
}

export const ReplayLivesSection = ({ replayLives }: ReplayLivesSectionProps) => {
  if (replayLives.length === 0) return null;

  return (
    <section className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Replays disponibles</h2>
          <p className="text-muted-foreground mt-1">
            Revivez les visites passées
          </p>
        </div>
        <Badge variant="secondary" className="px-4 py-1.5">
          {replayLives.length} replay{replayLives.length > 1 ? 's' : ''} disponible{replayLives.length > 1 ? 's' : ''}
        </Badge>
      </div>
      <LiveSlider lives={replayLives} />
    </section>
  );
};