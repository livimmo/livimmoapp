import { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Property } from "@/types/property";
import { LiveEvent } from "@/types/live";
import { PropertyCard } from "@/components/PropertyCard";
import { Badge } from "@/components/ui/badge";
import { Circle, Calendar, PlayCircle } from "lucide-react";

interface GoogleMapContainerProps {
  properties: Property[];
  selectedLive?: LiveEvent | null;
  onMarkerClick?: (live: LiveEvent | null) => void;
}

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "600px",
};

const defaultCenter = {
  lat: 31.7917,
  lng: -7.0926,
};

// Icônes personnalisées pour chaque type de live
const liveMarkerIcon = {
  path: "M -1, -1 1, -1 1, 1 -1, 1",
  fillColor: '#ea384c',
  fillOpacity: 0.9,
  strokeWeight: 2,
  strokeColor: 'white',
  scale: 10,
};

const scheduledMarkerIcon = {
  ...liveMarkerIcon,
  fillColor: '#3b82f6', // blue-500
};

const replayMarkerIcon = {
  ...liveMarkerIcon,
  fillColor: '#8b5cf6', // violet-500
};

export const GoogleMapContainer = ({
  properties,
}: GoogleMapContainerProps) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  useEffect(() => {
    if (mapRef && properties.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      properties.forEach((property) => {
        bounds.extend({
          lat: property.coordinates.lat,
          lng: property.coordinates.lng,
        });
      });
      mapRef.fitBounds(bounds);
    }
  }, [mapRef, properties]);

  const getMarkerIcon = (property: Property) => {
    if (property.isLiveNow) {
      return liveMarkerIcon;
    }
    if (property.liveDate && new Date(property.liveDate) > new Date()) {
      return scheduledMarkerIcon;
    }
    return replayMarkerIcon;
  };

  const MarkerBadge = ({ property }: { property: Property }) => (
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
      <Badge 
        variant={property.isLiveNow ? "destructive" : "default"}
        className={`
          ${property.isLiveNow ? 'bg-red-500' : property.liveDate ? 'bg-blue-500' : 'bg-violet-500'} 
          text-white flex items-center gap-1
        `}
      >
        {property.isLiveNow ? (
          <>
            <Circle className="w-2 h-2 fill-white animate-pulse" />
            En direct
          </>
        ) : property.liveDate ? (
          <>
            <Calendar className="w-3 h-3" />
            Programmé
          </>
        ) : (
          <>
            <PlayCircle className="w-3 h-3" />
            Replay
          </>
        )}
      </Badge>
    </div>
  );

  return (
    <div className="w-full h-full min-h-[600px] rounded-lg overflow-hidden shadow-lg">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            properties.length > 0
              ? {
                  lat: properties[0].coordinates.lat,
                  lng: properties[0].coordinates.lng,
                }
              : defaultCenter
          }
          zoom={6}
          onLoad={onLoad}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            fullscreenControl: true,
            mapTypeControl: true,
          }}
        >
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={{
                lat: property.coordinates.lat,
                lng: property.coordinates.lng,
              }}
              onClick={() => setSelectedProperty(property)}
              onMouseOver={() => setHoveredMarkerId(property.id)}
              onMouseOut={() => setHoveredMarkerId(null)}
              icon={getMarkerIcon(property)}
            >
              {(selectedProperty?.id === property.id || hoveredMarkerId === property.id) && (
                <InfoWindow
                  position={{
                    lat: property.coordinates.lat,
                    lng: property.coordinates.lng,
                  }}
                  onCloseClick={() => {
                    setSelectedProperty(null);
                    setHoveredMarkerId(null);
                  }}
                >
                  <div className="relative max-w-sm">
                    <MarkerBadge property={property} />
                    <PropertyCard {...property} />
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};