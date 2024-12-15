import { PropertyCard } from "@/components/PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Property } from "@/types/property";

interface HeroBannerProps {
  properties: Property[];
}

export const HeroBanner = ({ properties }: HeroBannerProps) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {properties.map((property) => (
            <CarouselItem key={property.id}>
              <div className="p-1">
                <PropertyCard 
                  {...property}
                  image={property.images[0]}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};