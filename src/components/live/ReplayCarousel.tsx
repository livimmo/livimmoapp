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
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { getRandomTags } from "@/utils/propertyTags";
import { ReplayCarouselHeader } from "./ReplayCarouselHeader";

interface ReplayCarouselProps {
  replays: LiveEvent[];
  currentReplayId: number;
  onReplaySelect: (replayId: number) => void;
}

export const ReplayCarousel = ({ 
  replays, 
  currentReplayId, 
  onReplaySelect,
}: ReplayCarouselProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const autoplayOptions = {
    delay: 4000,
    stopOnInteraction: true,
  };

  useEffect(() => {
    if (currentReplayId) {
      setIsCollapsed(true);
    }
  }, [currentReplayId]);

  const filteredReplays = replays.filter(replay => replay.id !== currentReplayId);

  return (
    <div className={cn(
      "transition-all duration-300 ease-in-out",
      isCollapsed ? "h-16" : "h-[320px]",
      "p-4",
      "bg-[#F2FCE2]" // Ajout du fond vert doux
    )}>
      <ReplayCarouselHeader 
        replayCount={filteredReplays.length}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <div className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden",
        isCollapsed ? "h-0 opacity-0" : "h-[240px] opacity-100"
      )}>
        {!isCollapsed && (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay(autoplayOptions)
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {filteredReplays.map((replay) => (
                <CarouselItem key={replay.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div
                    className={cn(
                      "relative group cursor-pointer rounded-lg overflow-hidden",
                      "transition-all duration-200 hover:ring-2 hover:ring-emerald-500",
                      replay.id === currentReplayId && "ring-2 ring-emerald-500"
                    )}
                    onClick={() => onReplaySelect(replay.id)}
                  >
                    <img
                      src={replay.thumbnail}
                      alt={replay.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge variant="secondary" className="bg-emerald-500 text-white">
                        Visionner
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[80%]">
                      <Badge 
                        variant="secondary"
                        className="flex items-center gap-1.5 px-2 py-1 bg-emerald-600 text-white"
                      >
                        REPLAY
                      </Badge>
                      {replay.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant={
                            tag === "Coup de fusil"
                              ? "destructive"
                              : tag === "Nouveauté"
                              ? "default"
                              : "secondary"
                          }
                          className="bg-white/90 backdrop-blur-sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                      <p className="text-white text-sm font-medium truncate">
                        {replay.title}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        )}
      </div>
    </div>
  );
};