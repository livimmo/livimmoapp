import { PropertyList } from "@/components/properties/PropertyList";
import { Button } from "@/components/ui/button";
import { List, Map } from "lucide-react";
import { type Property } from "@/types/property";
import { useState } from "react";
import { MapView } from "./MapView";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PropertyCard } from "../PropertyCard";

interface SearchSectionProps {
  filteredProperties: Property[];
  defaultProperties: Property[];
}

export const SearchSection = ({ 
  filteredProperties, 
  defaultProperties 
}: SearchSectionProps) => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const isMobile = useIsMobile();
  
  const displayProperties = filteredProperties.length > 0 
    ? filteredProperties 
    : defaultProperties;

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-lg font-semibold">
          {filteredProperties.length > 0 
            ? `${filteredProperties.length} biens trouvés`
            : "Tous nos biens"
          }
        </h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}
            onClick={() => setViewMode("list")}
            className="px-3"
          >
            <List className="h-4 w-4 mr-2" />
            Liste
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}
            onClick={() => setViewMode("map")}
            className="px-3"
          >
            <Map className="h-4 w-4 mr-2" />
            Carte
          </Button>
        </div>
      </div>
      
      {viewMode === "list" ? (
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              slidesToScroll: isMobile ? 1 : 3,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {displayProperties.map((property) => (
                <CarouselItem 
                  key={property.id} 
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <PropertyCard {...property} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      ) : (
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-8'} h-[600px]`}>
          <div className="rounded-lg overflow-hidden border border-gray-200 h-full">
            <MapView properties={displayProperties} />
          </div>
          <ScrollArea className="h-full bg-white rounded-lg shadow p-4">
            <PropertyList 
              properties={displayProperties}
              viewMode="list"
            />
          </ScrollArea>
        </div>
      )}
    </section>
  );
};