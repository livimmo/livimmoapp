import { PropertyViewToggle } from "@/components/properties/PropertyViewToggle";

export interface LiveCalendarHeaderProps {
  viewMode: "list" | "map";
  onViewChange: (mode: "list" | "map") => void;
  liveCount: number;
}

export const LiveCalendarHeader = ({ 
  viewMode, 
  onViewChange,
  liveCount 
}: LiveCalendarHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">
          {liveCount} live{liveCount > 1 ? 's' : ''} programmé{liveCount > 1 ? 's' : ''}
        </h3>
      </div>
      <PropertyViewToggle view={viewMode} onViewChange={onViewChange} />
    </div>
  );
};