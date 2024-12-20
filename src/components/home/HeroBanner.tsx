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

interface HeroBannerProps {
  properties: Property[];
  currentLives?: LiveEvent[];
  replays?: LiveEvent[];
}

export const HeroBanner = ({ properties, currentLives = [], replays = [] }: HeroBannerProps) => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  // Combine all content types into slides
  const slides = [
    // Advertisement slides
    {
      type: "ad",
      content: {
        image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        title: "Découvrez notre nouvelle application mobile",
        description: "Visitez des biens immobiliers en direct depuis votre smartphone",
        buttonText: "Télécharger",
        link: "/download"
      }
    },
    {
      type: "ad",
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
        agent: live.agent
      }
    })),
    // Replay slides
    ...replays.map(replay => ({
      type: "replay" as const,
      content: {
        image: replay.thumbnail,
        title: replay.title,
        description: replay.description,
        duration: "20 min", // À remplacer par la vraie durée
        buttonText: "Voir le replay",
        link: `/replay/${replay.id}`,
        agent: replay.agent
      }
    }))
  ];

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
              <HeroSlide {...slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
    </div>
  );
};