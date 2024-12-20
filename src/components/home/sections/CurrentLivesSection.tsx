import { LiveEvent } from "@/types/live";
import { Property } from "@/types/property";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { LiveSlide } from "@/components/live/LiveSlide";
import { Dispatch, SetStateAction } from "react";

interface CurrentLivesSectionProps {
  currentLives: LiveEvent[];
  currentLiveProperties: Property[];
  currentLiveViewMode: "map" | "list";
  setCurrentLiveViewMode: Dispatch<SetStateAction<"map" | "list">>;
}

export const CurrentLivesSection = ({
  currentLives,
  currentLiveProperties,
  currentLiveViewMode,
  setCurrentLiveViewMode,
}: CurrentLivesSectionProps) => {
  const isMobile = useIsMobile();
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  if (currentLives.length === 0) return null;

  return (
    <section className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Lives en cours</h2>
          <p className="text-muted-foreground mt-1">
            Découvrez les visites en direct disponibles
          </p>
        </div>
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
          {currentLives.map((live) => (
            <CarouselItem key={live.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <LiveSlide live={live} index={0} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-12 h-12 w-12" />
        <CarouselNext className="-right-12 h-12 w-12" />
      </Carousel>
    </section>
  );
};