import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { type Property } from "@/types/property";
import { PropertyCard } from '../PropertyCard';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { Clock } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface LiveGoogleMapProps {
  properties: Property[];
}

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

export function LiveGoogleMap({ properties }: LiveGoogleMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const defaultCenter = {
    lat: 31.7917,
    lng: -7.0926
  };
  
  const center = properties.length > 0
    ? {
        lat: properties.reduce((sum, p) => sum + p.coordinates.lat, 0) / properties.length,
        lng: properties.reduce((sum, p) => sum + p.coordinates.lng, 0) / properties.length,
      }
    : defaultCenter;

  const mapStyles = {
    width: '100%',
    height: '100%'
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Clé API Google Maps manquante. Veuillez configurer VITE_GOOGLE_MAPS_API_KEY.
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 h-[700px]">
      <div className="relative h-[400px] lg:h-full">
        {isLoading && (
          <Skeleton className="w-full h-full rounded-lg" />
        )}
        <LoadScript 
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          libraries={libraries}
          onLoad={handleLoad}
        >
          <GoogleMap
            mapContainerStyle={mapStyles}
            center={center}
            zoom={6}
          >
            {properties.map((property) => (
              <Marker
                key={property.id}
                position={{
                  lat: property.coordinates.lat,
                  lng: property.coordinates.lng
                }}
                onClick={() => setSelectedProperty(property)}
              />
            ))}
            
            {selectedProperty && (
              <InfoWindow
                position={{
                  lat: selectedProperty.coordinates.lat,
                  lng: selectedProperty.coordinates.lng
                }}
                onCloseClick={() => setSelectedProperty(null)}
              >
                <div className="p-2 max-w-[300px]">
                  <div className="relative mb-2">
                    <img 
                      src={selectedProperty.images[0]} 
                      alt={selectedProperty.title}
                      className="w-full h-[150px] object-cover rounded-lg"
                    />
                    {selectedProperty.hasLive && (
                      <div className="absolute bottom-2 left-2">
                        {selectedProperty.isLiveNow ? (
                          <Badge variant="destructive" className="bg-red-500">
                            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-white animate-pulse" />
                            Live en cours
                          </Badge>
                        ) : selectedProperty.liveDate && (
                          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                            <Clock className="mr-1 h-4 w-4" />
                            {new Date(selectedProperty.liveDate).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-base mb-1">{selectedProperty.title}</h3>
                  <p className="text-primary font-bold">{selectedProperty.price.toLocaleString()} DH</p>
                  <p className="text-sm text-gray-500">{selectedProperty.location}</p>
                  <div className="flex gap-2 text-sm text-gray-500 mt-1">
                    <span>{selectedProperty.surface} m²</span>
                    <span>•</span>
                    <span>{selectedProperty.rooms} pièces</span>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      <ScrollArea className="h-[300px] lg:h-full bg-white rounded-lg shadow-lg p-4">
        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className={`cursor-pointer transition-all ${
                selectedProperty?.id === property.id
                  ? "ring-2 ring-primary rounded-lg"
                  : ""
              }`}
              onClick={() => setSelectedProperty(property)}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}