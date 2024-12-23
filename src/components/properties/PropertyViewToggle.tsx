import { Button } from "@/components/ui/button";
import { Grid, Map } from "lucide-react";

interface PropertyViewToggleProps {
  view: "list" | "map";
  onViewChange: (view: "list" | "map") => void;
}

export const PropertyViewToggle = ({ view, onViewChange }: PropertyViewToggleProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={view === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("list")}
      >
        <Grid className="h-4 w-4 mr-2" />
        Liste
      </Button>
      <Button
        variant={view === "map" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("map")}
      >
        <Map className="h-4 w-4 mr-2" />
        Carte
      </Button>
    </div>
  );
};