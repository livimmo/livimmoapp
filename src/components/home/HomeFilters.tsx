import { useState } from "react";
import { Property } from "@/types/property";

interface HomeFiltersProps {
  properties: Property[];
  onFilterChange: (filters: any) => void;
}

export const HomeFilters = ({ properties, onFilterChange }: HomeFiltersProps) => {
  const [viewType, setViewType] = useState<string>("all");

  const handleViewTypeChange = (type: string) => {
    setViewType(type);
    onFilterChange({ viewType: type });
  };

  const filterByViewType = (property: Property) => {
    switch (viewType) {
      case "live":
        return property.has_live && !property.is_replay;
      case "replay":
        return property.is_replay;
      case "scheduled":
        return property.has_scheduled_live;
      case "virtual":
        return property.virtual_tour?.enabled;
      default:
        return true;
    }
  };

  const filteredProperties = properties.filter(filterByViewType);

  return (
    <div>
      <div>
        <button onClick={() => handleViewTypeChange("all")}>All</button>
        <button onClick={() => handleViewTypeChange("live")}>Live</button>
        <button onClick={() => handleViewTypeChange("replay")}>Replay</button>
        <button onClick={() => handleViewTypeChange("scheduled")}>Scheduled</button>
        <button onClick={() => handleViewTypeChange("virtual")}>Virtual Tour</button>
      </div>
      <div>
        {filteredProperties.map(property => (
          <div key={property.id}>
            <h3>{property.title}</h3>
            <p>{property.price} DH</p>
          </div>
        ))}
      </div>
    </div>
  );
};