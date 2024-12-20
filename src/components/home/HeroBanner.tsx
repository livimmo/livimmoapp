import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HeroSlide } from "./HeroSlide";
import { type Property } from "@/types/property";
import { type LiveEvent } from "@/types/live";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroBannerProps {
  properties: Property[];
  currentLives?: LiveEvent[];
  replays?: LiveEvent[];
}

export const HeroBanner = ({ properties, currentLives = [], replays = [] }: HeroBannerProps) => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const isMobile = useIsMobile();

  // Combine all content types into slides with proper typing
  const slides = [
    // Advertisement slides with explicit type
    {
      type: "ad" as const,
      content: {
        image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        title: "Découvrez notre nouvelle application mobile",
        description: "Visitez des biens immobiliers en direct depuis votre smartphone",
        buttonText: "Télécharger",
        link: "/download"
      }
    },
    {
      type: "ad" as const,
      content: {
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        title: "Devenez agent Livimmo",
        description: "Rejoignez notre réseau d'agents et développez votre activité",
        buttonText: "En savoir plus",
        link: "/become-agent"
      }
    },
    // Live slides
    ...currentLives.map(live => ({
      type: "live" as const,
      content: {
        image: live.thumbnail,
        title: live.title,
        description: live.description,
        viewers: live.viewers,
        buttonText: "Rejoindre le live",
        link: `/live/${live.id}`,
        agent: live.agent,
        price: live.price,
        location: live.location
      }
    })),
    // Replay slides
    ...replays.map(replay => ({
      type: "replay" as const,
      content: {
        image: replay.thumbnail,
        title: replay.title,
        description: replay.description,
        duration: "20 min",
        buttonText: "Voir le replay",
        link: `/replay/${replay.id}`,
        agent: replay.agent,
        price: replay.price,
        location: replay.location
      }
    }))
  ];

  // Si on est sur mobile, ne pas rendre le composant
  if (isMobile) {
    return null;
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto mb-8">
      <Carousel 
        className="w-full"
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="basis-full">
              <HeroSlide type={slide.type} content={slide.content} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
    </div>
  );
};