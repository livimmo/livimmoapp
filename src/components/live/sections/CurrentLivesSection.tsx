import { LiveEvent } from "@/types/live";
import { Property } from "@/types/property";
import { LiveCard } from "@/components/live/LiveCard";

interface CurrentLivesSectionProps {
  lives: LiveEvent[];
  viewMode: "list" | "map";
  onViewModeChange: (mode: "list" | "map") => void;
}

export const CurrentLivesSection = ({
  lives,
  viewMode,
  onViewModeChange,
}: CurrentLivesSectionProps) => {
  if (lives.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            Lives en cours
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({lives.length})
            </span>
          </h2>
          <p className="text-muted-foreground mt-1">
            Découvrez les visites en direct disponibles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lives.map((live) => (
          <LiveCard key={live.id} live={live} />
        ))}
      </div>
    </section>
  );
};