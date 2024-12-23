import { Button } from "@/components/ui/button";
import { Grid2X2, List, Map } from "lucide-react";
import { type ViewMode } from "@/types/search";

interface SearchHeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  resultsCount: number;
}

export const SearchHeader = ({ viewMode, setViewMode, resultsCount }: SearchHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">
        {resultsCount} {resultsCount > 1 ? "biens trouvés" : "bien trouvé"}
      </h2>
      <div className="flex gap-2">
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="icon"
          onClick={() => setViewMode("grid")}
        >
          <Grid2X2 className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="icon"
          onClick={() => setViewMode("list")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "map" ? "default" : "outline"}
          size="icon"
          onClick={() => setViewMode("map")}
        >
          <Map className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};