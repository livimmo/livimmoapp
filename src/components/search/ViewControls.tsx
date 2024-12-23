import { List, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ViewMode } from "@/types/search";

interface ViewControlsProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const ViewControls = ({ viewMode, setViewMode }: ViewControlsProps) => {
  return (
    <div className="flex gap-1">
      <Button
        variant={viewMode === "grid" ? "default" : "outline"}
        size="sm"
        className={viewMode === "grid" ? "bg-primary text-white hover:bg-primary/90" : ""}
        onClick={() => setViewMode("grid")}
      >
        <List className="h-4 w-4 mr-2" />
        Liste
      </Button>
      <Button
        variant={viewMode === "map" ? "default" : "outline"}
        size="sm"
        className={viewMode === "map" ? "bg-primary text-white hover:bg-primary/90" : ""}
        onClick={() => setViewMode("map")}
      >
        <Map className="h-4 w-4 mr-2" />
        Carte
      </Button>
    </div>
  );
};