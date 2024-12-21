import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface DeveloperSlide {
  id: number;
  type: "ad" | "property" | "live" | "registration";
  image: string;
  title: string;
  description: string;
  link?: string;
  price?: number;
  location?: string;
  date?: string;
  viewers?: number;
  remainingSeats?: number;
}

interface DeveloperSliderProps {
  slides: DeveloperSlide[];
}

export const DeveloperSlider = ({ slides }: DeveloperSliderProps) => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleAction = (slide: DeveloperSlide) => {
    if (slide.link) {
      navigate(slide.link);
    }
  };

  // Ne pas rendre le composant sur mobile
  if (isMobile) {
    return null;
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto mb-8">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4">
              <div className="relative group overflow-hidden rounded-lg">
                <div className="relative aspect-[16/9]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button onClick={() => handleAction(slide)}>
                        {slide.type === "live" ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Rejoindre le live
                          </>
                        ) : slide.type === "registration" ? (
                          "S'inscrire"
                        ) : (
                          "Voir plus"
                        )}
                      </Button>
                    </div>
                  </div>
                  {slide.type === "live" && (
                    <Badge variant="destructive" className="absolute top-2 left-2 animate-pulse">
                      En direct
                    </Badge>
                  )}
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{slide.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {slide.description}
                  </p>
                  {slide.price && (
                    <p className="text-primary font-bold">
                      {slide.price.toLocaleString()} DH
                    </p>
                  )}
                  {slide.location && (
                    <p className="text-sm text-muted-foreground">{slide.location}</p>
                  )}
                  {slide.type === "live" && slide.viewers && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Users className="w-4 h-4" />
                      {slide.viewers} spectateurs
                    </div>
                  )}
                  {slide.type === "registration" && slide.date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Calendar className="w-4 h-4" />
                      {slide.date}
                      {slide.remainingSeats !== undefined && (
                        <span className="ml-auto">
                          {slide.remainingSeats} places restantes
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
    </div>
  );
};