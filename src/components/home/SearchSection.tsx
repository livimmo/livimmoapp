import { PropertyList } from "@/components/properties/PropertyList";
import { type Property } from "@/types/property";
import { useIsMobile } from "@/hooks/use-mobile";
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
      </div>
      
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
    </section>
  );
};