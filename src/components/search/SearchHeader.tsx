import { ViewControls } from "./ViewControls";
import { type ViewMode } from "@/types/search";

interface SearchHeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  resultsCount: number;
}

export const SearchHeader = ({ viewMode, setViewMode, resultsCount }: SearchHeaderProps) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">
          {resultsCount > 0 
            ? `${resultsCount} biens trouvés`
            : "Aucun bien ne correspond à vos critères"
          }
        </h2>
        <ViewControls viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      {resultsCount === 0 && (
        <p className="text-muted-foreground">
          Essayez de modifier vos filtres pour voir plus de résultats.
        </p>
      )}
    </div>
  );
};