import { Button } from "@/components/ui/button";
import { Grid, Map } from "lucide-react";

interface ViewControlsProps {
  viewMode: "grid" | "map";
  setViewMode: (mode: "grid" | "map") => void;
}

export const ViewControls = ({ viewMode, setViewMode }: ViewControlsProps) => {
  return (
    <div className="flex justify-end mb-3 gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setViewMode("grid")}
        className={viewMode === "grid" ? "bg-accent" : ""}
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setViewMode("map")}
        className={viewMode === "map" ? "bg-accent" : ""}
      >
        <Map className="h-4 w-4" />
      </Button>
    </div>
  );
};