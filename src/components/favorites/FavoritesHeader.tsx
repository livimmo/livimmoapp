import { Button } from "@/components/ui/button";
import { Grid, Map } from "lucide-react";

interface FavoritesHeaderProps {
  viewMode: "grid" | "map";
  onViewModeChange: (mode: "grid" | "map") => void;
}

export const FavoritesHeader = ({ viewMode, onViewModeChange }: FavoritesHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Mes Favoris</h1>
      <div className="space-x-2">
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewModeChange("grid")}
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "map" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewModeChange("map")}
        >
          <Map className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};