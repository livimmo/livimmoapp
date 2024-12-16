import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const ads = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    title: "Découvrez nos offres exclusives",
    link: "/offres",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    title: "Nouveaux biens disponibles",
    link: "/biens",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    title: "Estimation gratuite",
    link: "/estimation",
  },
];

export const AdvertBanner = () => {
  const [api, setApi] = useState<any>(null);
  const autoplay = Autoplay({ delay: 4000, stopOnInteraction: false });

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      console.log("Current slide:", api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full bg-accent py-4">
      <Carousel
        setApi={setApi}
        plugins={[autoplay]}
        className="w-full max-w-5xl mx-auto"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {ads.map((ad) => (
            <CarouselItem key={ad.id}>
              <a
                href={ad.link}
                className="relative block w-full h-[200px] overflow-hidden rounded-lg"
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold text-center px-4">
                    {ad.title}
                  </h3>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};