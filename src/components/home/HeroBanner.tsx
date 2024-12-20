import { PropertyCard } from "@/components/PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type Property } from "@/types/property";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface HeroBannerProps {
  properties: Property[];
}

export const HeroBanner = ({ properties }: HeroBannerProps) => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="relative w-full max-w-7xl mx-auto mb-8">
      <Carousel 
        className="w-full"
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {properties.map((property) => (
            <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <PropertyCard {...property} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};