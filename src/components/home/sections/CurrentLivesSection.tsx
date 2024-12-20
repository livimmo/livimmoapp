import { LiveStream } from "@/types/live";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { List, Map } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { LiveCard } from "@/components/live/LiveCard";

interface CurrentLivesSectionProps {
  currentLives: LiveStream[];
  currentLiveProperties: Property[];
  currentLiveViewMode: "list" | "map";
  setCurrentLiveViewMode: (mode: "list" | "map") => void;
  onPropertyHover?: (live: LiveStream | null) => void;
}

export const CurrentLivesSection = ({
  currentLives,
  currentLiveProperties,
  currentLiveViewMode,
  setCurrentLiveViewMode,
  onPropertyHover
}: CurrentLivesSectionProps) => {
  const isMobile = useIsMobile();

  if (currentLives.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lives en cours</h2>
        <div className="flex gap-2">
          <Button
            variant={currentLiveViewMode === "list" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}
            onClick={() => setCurrentLiveViewMode("list")}
          >
            <List className="h-4 w-4 mr-2" />
            Liste
          </Button>
          <Button
            variant={currentLiveViewMode === "map" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}
            onClick={() => setCurrentLiveViewMode("map")}
          >
            <Map className="h-4 w-4 mr-2" />
            Carte
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentLives.map((live) => (
          <div
            key={live.id}
            onMouseEnter={() => onPropertyHover?.(live)}
            onMouseLeave={() => onPropertyHover?.(null)}
          >
            <LiveCard live={live} />
          </div>
        ))}
      </div>
    </section>
  );
};