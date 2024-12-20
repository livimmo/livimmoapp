import { Badge } from "@/components/ui/badge";
import { PropertyViewToggle } from "@/components/properties/PropertyViewToggle";

interface LiveCalendarHeaderProps {
  viewMode: "list" | "map";
  onViewChange: (mode: "list" | "map") => void;
  liveCount: number;
}

export const LiveCalendarHeader = ({ viewMode, onViewChange, liveCount }: LiveCalendarHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">Lives programmés</h2>
        <Badge variant="secondary" className="px-4 py-1.5">
          {liveCount} live{liveCount > 1 ? 's' : ''} programmé{liveCount > 1 ? 's' : ''}
        </Badge>
      </div>
      <PropertyViewToggle view={viewMode} onViewChange={onViewChange} />
    </div>
  );
};