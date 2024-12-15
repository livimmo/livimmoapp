import { PropertyCard } from "@/components/PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FeaturedProperty {
  id: number;
  image: string;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  hasLive?: boolean;
  tags?: string[];
}

interface HeroBannerProps {
  properties: FeaturedProperty[];
}

export const HeroBanner = ({ properties }: HeroBannerProps) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto mb-8">
      <Carousel className="w-full">
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
    </div>
  );
};