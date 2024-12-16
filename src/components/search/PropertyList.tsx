import { PropertyCard } from "@/components/PropertyCard";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type Property } from "@/types/property";

interface PropertyListProps {
  properties: Property[];
  viewMode?: "list" | "carousel";
}

export const PropertyList: React.FC<PropertyListProps> = ({ 
  properties, 
  viewMode = "list" 
}) => {
  if (viewMode === "carousel") {
    return (
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {properties.map((property) => (
            <CarouselItem key={property.id}>
              <div className="p-1">
                <PropertyCard {...property} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }

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