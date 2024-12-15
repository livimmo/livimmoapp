import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Video, Heart } from "lucide-react";
import { mockProperties } from "./Properties";

export const PropertyDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const property = mockProperties.find((p) => p.id === Number(id));

  if (!property) {
    return <div>Propriété non trouvée</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container px-4 py-8">
        <div className="mb-8">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {property.images.map((image, index) => (
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <p className="text-2xl font-semibold text-primary">
                  {property.price.toLocaleString()} DH
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
                  }`}
                />
              </Button>
            </div>

            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {property.location}
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-accent rounded-lg">
                <div className="font-semibold">{property.surface} m²</div>
                <div className="text-sm text-muted-foreground">Surface</div>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <div className="font-semibold">{property.rooms}</div>
                <div className="text-sm text-muted-foreground">Pièces</div>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <div className="font-semibold">{property.bathrooms}</div>
                <div className="text-sm text-muted-foreground">Salle de bains</div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{property.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Équipements</h2>
              <div className="flex flex-wrap gap-2">
                {property.features.map((feature) => (
                  <Badge key={feature} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {property.hasLive && (
              <Card className="p-4 bg-accent">
                <div className="flex items-center gap-2 mb-2">
                  <Video className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Live programmé</span>
                </div>
                <p className="text-sm mb-4">
                  {property.liveDate?.toLocaleDateString()}
                </p>
                <Button className="w-full">Rejoindre le live</Button>
              </Card>
            )}

            <Card className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{property.agent.name}</h3>
                  <p className="text-sm text-muted-foreground">Agent immobilier</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  {property.agent.phone}
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  {property.agent.email}
                </Button>
              </div>
            </Card>

            <Button className="w-full">Faire une offre</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;