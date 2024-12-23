import { ViewControls } from "./ViewControls";
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
        {resultsCount > 0 
          ? `${resultsCount} bien${resultsCount > 1 ? 's' : ''} trouvé${resultsCount > 1 ? 's' : ''}`
          : "Aucun bien trouvé"
        }
      </h2>
      <ViewControls viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
};