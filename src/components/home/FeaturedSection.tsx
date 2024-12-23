import { type Property } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface FeaturedSectionProps {
  properties: Property[];
}

export const FeaturedSection = ({ properties }: FeaturedSectionProps) => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  // Sort properties by number of viewers (descending)
  const sortedProperties = [...properties].sort((a, b) => {
    const viewersA = a.viewers || 0;
    const viewersB = b.viewers || 0;
    return viewersB - viewersA;
  });

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Lives populaires</h2>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {sortedProperties.map((property) => (
            <CarouselItem key={property.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <PropertyCard 
                key={property.id} 
                {...property} 
                offers={!property.hasLive ? Math.floor(Math.random() * 20) : undefined}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-12 h-12 w-12" />
        <CarouselNext className="-right-12 h-12 w-12" />
      </Carousel>
    </section>
  );
};