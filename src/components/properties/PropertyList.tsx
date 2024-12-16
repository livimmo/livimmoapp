import { useAuth } from "@/contexts/AuthContext";
import { Property } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";
import { AddPropertyDialog } from "@/components/property/AddPropertyDialog";

interface PropertyListProps {
  properties: Property[];
  viewMode?: "list" | "grid" | "map";
}

export const PropertyList = ({ properties, viewMode = "grid" }: PropertyListProps) => {
  const { user } = useAuth();
  const isAgent = user?.role === "agent" || user?.role === "promoter";

  return (
    <div className="space-y-6">
      
      <div className={`grid grid-cols-1 ${
        viewMode === "list" 
          ? "md:grid-cols-1" 
          : "md:grid-cols-2 lg:grid-cols-3"
      } gap-6`}>
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
};