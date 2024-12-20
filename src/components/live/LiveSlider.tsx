import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LiveSlide } from "./LiveSlide";
import { LiveEvent } from "@/types/live";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface LiveSliderProps {
  lives: LiveEvent[];
  className?: string;
}

export const LiveSlider = ({ lives, className }: LiveSliderProps) => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className={cn("w-full", className)}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {lives.map((live, index) => (
          <CarouselItem key={live.id} className="pl-2 md:pl-4 basis-full">
            <LiveSlide live={live} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};