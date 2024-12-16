import { LiveEvent } from "@/types/live";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LiveCarouselProps {
  lives: LiveEvent[];
  currentLiveId: number;
  onLiveSelect: (liveId: number) => void;
}

export const LiveCarousel = ({ lives, currentLiveId, onLiveSelect }: LiveCarouselProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Autres lives en cours</h3>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {lives.map((live) => (
            <CarouselItem key={live.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div
                className={cn(
                  "relative group cursor-pointer rounded-lg overflow-hidden",
                  "transition-all duration-200 hover:ring-2 hover:ring-primary",
                  live.id === currentLiveId && "ring-2 ring-primary"
                )}
                onClick={() => onLiveSelect(live.id)}
              >
                <img
                  src={live.thumbnail}
                  alt={live.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge variant="secondary" className="bg-primary text-white">
                    Rejoindre
                  </Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge 
                    variant="destructive" 
                    className="flex items-center gap-1.5 px-2 py-1"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span className="animate-pulse">En direct</span>
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white text-sm font-medium truncate">
                    {live.title}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};