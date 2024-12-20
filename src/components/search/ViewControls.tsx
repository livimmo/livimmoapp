import { Button } from "@/components/ui/button";
import { Grid, LayoutList } from "lucide-react";

interface ViewControlsProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
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
        onClick={() => setViewMode("list")}
        className={viewMode === "list" ? "bg-accent" : ""}
      >
        <LayoutList className="h-4 w-4" />
      </Button>
    </div>
  );
};