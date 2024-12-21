import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LiveEvent } from "@/types/live";
import { LiveSlide } from "./LiveSlide";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

interface LiveSliderProps {
  lives: LiveEvent[];
}

export const LiveSlider = ({ lives }: LiveSliderProps) => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {lives.map((live, index) => (
          <CarouselItem key={live.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
            <LiveSlide live={live} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-12 h-12 w-12" />
      <CarouselNext className="-right-12 h-12 w-12" />
    </Carousel>
  );
};