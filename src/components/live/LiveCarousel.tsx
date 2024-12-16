import { LiveEvent } from "@/types/live";
import { X, ChevronDown, ChevronUp, Minimize2, Maximize2 } from "lucide-react";
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
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { getRandomTags } from "@/utils/propertyTags";

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
  const [isCollapsed, setIsCollapsed] = useState(false);
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
      "p-4 transition-all duration-300",
      isCollapsed && "h-16"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-semibold">Autres lives en cours</h3>
          <Badge variant="secondary" className="bg-white/10 text-white">
            {allLives.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <Maximize2 className="h-5 w-5" />
            ) : (
              <Minimize2 className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

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
                  {onLiveClose && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 z-10 bg-black/50 hover:bg-black/75 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLiveClose(live.id);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge variant="secondary" className="bg-primary text-white">
                      Rejoindre
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[80%]">
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
                    {live.tags?.map((tag) => (
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
      )}
    </div>
  );
};