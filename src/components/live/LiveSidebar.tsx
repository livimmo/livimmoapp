import { LiveEvent } from "@/types/live";
import { Eye, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface LiveSidebarProps {
  currentLiveId: number;
  lives: LiveEvent[];
}

export const LiveSidebar = ({ currentLiveId, lives }: LiveSidebarProps) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const otherLives = lives.filter(live => live.id !== currentLiveId && live.status === 'live');
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  if (otherLives.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed right-0 top-1/2 -translate-y-1/2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "border-l shadow-lg transition-all duration-300 z-50",
        isCollapsed ? "w-12" : "w-80"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute -left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-[#ea384c] hover:from-primary/90 hover:to-[#ea384c]/90",
          "text-white rounded-full shadow-lg transition-all duration-300 group",
          "hover:scale-110",
          isCollapsed ? "hover:translate-x-1" : "hover:-translate-x-1"
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="relative">
          <ChevronRight className={cn(
            "h-4 w-4 transition-transform duration-300",
            !isCollapsed && "rotate-180"
          )} />
          <Badge 
            variant="secondary" 
            className="absolute -top-3 -right-3 h-5 min-w-5 p-0 flex items-center justify-center bg-[#ea384c] text-white text-xs"
          >
            {otherLives.length}
          </Badge>
        </div>
      </Button>

      {!isCollapsed && (
        <ScrollArea className="h-[400px]">
          <div className="p-4">
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {otherLives.map(live => (
                  <CarouselItem key={live.id}>
                    <div 
                      className="cursor-pointer group"
                      onClick={() => navigate(`/live/${live.id}`)}
                    >
                      <div className="relative rounded-lg overflow-hidden">
                        <img 
                          src={live.thumbnail} 
                          alt={live.title}
                          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <Badge 
                          variant="destructive" 
                          className="absolute top-2 left-2 animate-pulse"
                        >
                          En direct
                        </Badge>
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {live.viewers}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h3 className="font-medium text-sm line-clamp-2">{live.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{live.location}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </ScrollArea>
      )}
    </div>
  );
};