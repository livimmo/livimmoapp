import { Property } from "@/types/property";
import { VirtualTourCard } from "./VirtualTourCard";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface VirtualToursSectionProps {
  properties: Property[];
}

export const VirtualToursSection = ({ properties }: VirtualToursSectionProps) => {
  const propertiesWithVirtualTours = properties.filter(
    (property) => property.virtualTour?.enabled
  );

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  if (propertiesWithVirtualTours.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Visites Virtuelles</h2>
        <div className="bg-accent rounded-lg p-8 text-center">
          <Eye className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Aucune visite virtuelle disponible pour le moment
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Visites Virtuelles</h2>
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Toutes les visites
        </Button>
      </div>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {propertiesWithVirtualTours.map((property) => (
            <CarouselItem key={property.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <VirtualTourCard property={property} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-12 h-12 w-12" />
        <CarouselNext className="-right-12 h-12 w-12" />
      </Carousel>
    </section>
  );
};