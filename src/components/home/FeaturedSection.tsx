import { HeroBanner } from "@/components/home/HeroBanner";
import { type Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";

interface FeaturedSectionProps {
  properties: Property[];
}

export const FeaturedSection = ({ properties }: FeaturedSectionProps) => {
  return (
    <section className="mb-12">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-2xl font-bold text-primary">
          Notre sélection de la semaine
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Découvrez nos biens en live cette semaine et inscrivez-vous dès maintenant pour une visite exclusive
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              {property.hasLive && property.liveDate && (
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                  <Badge className="bg-primary/90 backdrop-blur-sm text-white">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(property.liveDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                    <Users className="w-4 h-4 mr-1" />
                    15 places restantes
                  </Badge>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
              <p className="text-primary font-bold text-xl mb-4">
                {property.price.toLocaleString()} DH
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{property.location}</span>
                <span className="mx-2">•</span>
                <span>{property.type}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{property.surface} m²</span>
                <span>{property.rooms} pièces</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};