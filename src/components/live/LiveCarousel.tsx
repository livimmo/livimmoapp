import { LiveEvent } from "@/types/live";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { getRandomTags } from "@/utils/propertyTags";
import { LiveCarouselHeader } from "./LiveCarouselHeader";
import { LiveCarouselCard } from "./LiveCarouselCard";

interface LiveCarouselProps {
  lives: LiveEvent[];
  currentLiveId: number;
  onLiveSelect: (liveId: number) => void;
  onLiveClose?: (liveId: number) => void;
}

export const LiveCarousel = ({ 
  lives, 
  currentLiveId, 
  onLiveSelect,
  onLiveClose 
}: LiveCarouselProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const autoplayOptions = {
    delay: 4000,
    stopOnInteraction: true,
  };

  const demoLives: LiveEvent[] = [
    {
      id: 101,
      title: "Villa de luxe avec piscine",
      description: "Magnifique villa avec vue panoramique",
      thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      agent: "Sarah Martin",
      agentId: 1,
      location: "Marrakech",
      type: "Villa",
      price: "4,500,000 DH",
      status: "live",
      date: new Date(),
      availableSeats: 15,
      viewers: 24,
      tags: getRandomTags(),
    },
    {
      id: 102,
      title: "Appartement vue mer",
      description: "Superbe appartement en front de mer",
      thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      agent: "Mohammed Alami",
      agentId: 2,
      location: "Tanger",
      type: "Appartement",
      price: "2,800,000 DH",
      status: "live",
      date: new Date(),
      availableSeats: 10,
      viewers: 18,
      tags: getRandomTags(),
    },
    {
      id: 103,
      title: "Riad traditionnel",
      description: "Authentique riad dans la médina",
      thumbnail: "https://images.unsplash.com/photo-1590059390047-f5e617b6cbc7",
      agent: "Yasmine Idrissi",
      agentId: 3,
      location: "Fès",
      type: "Riad",
      price: "3,200,000 DH",
      status: "live",
      date: new Date(),
      availableSeats: 8,
      viewers: 32,
      tags: getRandomTags(),
    },
    {
      id: 104,
      title: "Penthouse moderne",
      description: "Penthouse avec terrasse privée",
      thumbnail: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e",
      agent: "Karim Benjelloun",
      agentId: 4,
      location: "Casablanca",
      type: "Appartement",
      price: "5,900,000 DH",
      status: "live",
      date: new Date(),
      availableSeats: 12,
      viewers: 45,
      tags: getRandomTags(),
    },
    {
      id: 105,
      title: "Villa contemporaine",
      description: "Villa moderne avec jardin",
      thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      agent: "Leila Amrani",
      agentId: 5,
      location: "Rabat",
      type: "Villa",
      price: "6,200,000 DH",
      status: "live",
      date: new Date(),
      availableSeats: 20,
      viewers: 29,
      tags: getRandomTags(),
    },
  ];

  const allLives = [...demoLives, ...lives].filter(live => live.id !== currentLiveId);

  return (
    <div className={cn(
      "transition-all duration-300 ease-in-out",
      isCollapsed ? "h-[64px]" : "h-[320px] p-4"
    )}>
      <LiveCarouselHeader 
        liveCount={allLives.length}
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
              {allLives.map((live) => (
                <CarouselItem key={live.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <LiveCarouselCard
                    live={live}
                    currentLiveId={currentLiveId}
                    onLiveSelect={onLiveSelect}
                    onLiveClose={onLiveClose}
                  />
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
