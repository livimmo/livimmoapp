import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Calendar, CircleDot } from "lucide-react";
import { ShareButtons } from "@/components/properties/ShareButtons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PropertyDetailHeaderProps {
  property: any;
  isFavorite: boolean;
  handleToggleFavorite: () => void;
}

export const PropertyDetailHeader = ({ 
  property, 
  isFavorite, 
  handleToggleFavorite 
}: PropertyDetailHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {property.images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <div className="relative aspect-video">
                  <img
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {!property.hasLive && (
            <Badge variant="destructive" className="bg-white/90 backdrop-blur-sm">
              Vendu
            </Badge>
          )}
          {property.hasLive && (
            <>
              {property.isLiveNow ? (
                <>
                  <Badge className="bg-[#ea384c]/90 backdrop-blur-sm text-white animate-pulse">
                    <CircleDot className="w-4 h-4 mr-1" />
                    Live en cours
                  </Badge>
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {property.viewers} spectateurs
                  </Badge>
                </>
              ) : (
                <Badge className="bg-primary/90 backdrop-blur-sm text-white">
                  <Calendar className="w-4 h-4 mr-1" />
                  Live le {new Date(property.liveDate).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Badge>
              )}
            </>
          )}
        </div>

        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm"
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
        <p className="text-2xl font-semibold text-primary mb-4">
          {property.price.toLocaleString()} DH
        </p>
        <ShareButtons property={property} currentUrl={window.location.href} />
      </div>
    </div>
  );
};