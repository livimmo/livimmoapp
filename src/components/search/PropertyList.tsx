import { PropertyCard } from "@/components/PropertyCard";
import { Badge } from "@/components/ui/badge";
import { type Property } from "@/types/property";

export interface PropertyListProps {
  properties: Property[];
  viewMode?: "list" | "grid";
}

export const PropertyList = ({ 
  properties, 
  viewMode = "grid" 
}: PropertyListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <div key={property.id} className="relative">
          <PropertyCard {...property} />
          {property.tags && (
            <div className="absolute top-2 left-2 flex gap-1 flex-wrap max-w-[70%] z-10">
              {property.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={
                    tag === "Coup de fusil"
                      ? "destructive"
                      : tag === "Nouveauté"
                      ? "default"
                      : "secondary"
                  }
                  className="text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};