import { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Property } from "@/types/property";
import { LiveEvent } from "@/types/live";
import { PropertyCard } from "@/components/PropertyCard";
import { Badge } from "@/components/ui/badge";
import { Circle, Calendar } from "lucide-react";

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

const markerIcon = {
  path: "M -1, -1 1, -1 1, 1 -1, 1",
  fillColor: '#ea384c',
  fillOpacity: 0.9,
  strokeWeight: 2,
  strokeColor: 'white',
  scale: 10,
};

const scheduledMarkerIcon = {
  ...markerIcon,
  fillColor: '#3b82f6', // blue-500
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

  const MarkerBadge = ({ isLive }: { isLive: boolean }) => (
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
      <Badge 
        variant={isLive ? "destructive" : "default"}
        className={`${isLive ? 'bg-red-500' : 'bg-blue-500'} text-white flex items-center gap-1`}
      >
        {isLive ? (
          <>
            <Circle className="w-2 h-2 fill-white animate-pulse" />
            En direct
          </>
        ) : (
          <>
            <Calendar className="w-3 h-3" />
            Programmé
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
              icon={property.isLiveNow ? markerIcon : scheduledMarkerIcon}
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
                    <MarkerBadge isLive={property.isLiveNow} />
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