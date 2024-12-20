import { LiveEvent } from "@/types/live";
import { LiveSlider } from "@/components/live/LiveSlider";
import { PropertyViewToggle } from "@/components/properties/PropertyViewToggle";
import { GoogleMapContainer } from "@/components/home/map/GoogleMapContainer";
import { Property } from "@/types/property";
import { useIsMobile } from "@/hooks/use-mobile";

interface CurrentLivesSectionProps {
  currentLives: LiveEvent[];
  currentLiveProperties: Property[];
  currentLiveViewMode: "list" | "map";
  setCurrentLiveViewMode: (mode: "list" | "map") => void;
}

export const CurrentLivesSection = ({
  currentLives,
  currentLiveProperties,
  currentLiveViewMode,
  setCurrentLiveViewMode,
}: CurrentLivesSectionProps) => {
  const isMobile = useIsMobile();

  if (currentLives.length === 0) return null;

  return (
    <section className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Lives en cours</h2>
          <p className="text-muted-foreground mt-1">
            Découvrez les visites en direct disponibles
          </p>
        </div>
        <PropertyViewToggle
          view={currentLiveViewMode}
          onViewChange={setCurrentLiveViewMode}
        />
      </div>
      {currentLiveViewMode === "list" ? (
        <LiveSlider lives={currentLives} />
      ) : (
        <div className="h-[600px] rounded-lg overflow-hidden">
          <GoogleMapContainer
            properties={currentLiveProperties}
            selectedLive={null}
            onMarkerClick={() => {}}
          />
        </div>
      )}
    </section>
  );
};