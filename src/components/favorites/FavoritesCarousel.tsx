import { PropertyCard } from "@/components/PropertyCard";
import { Property } from "@/types/property";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FavoritesCarouselProps {
  properties: Property[];
}

export const FavoritesCarousel = ({ properties }: FavoritesCarouselProps) => {
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
};