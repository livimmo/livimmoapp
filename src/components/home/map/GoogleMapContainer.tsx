import { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Property } from "@/types/property";
import { LiveEvent } from "@/types/live";
import { PropertyCard } from "@/components/PropertyCard";

interface GoogleMapContainerProps {
  selectedLiveType: "current" | "scheduled";
  livesToShow: LiveEvent[];
  onMarkerClick: (live: LiveEvent | null) => void;
  selectedLive: LiveEvent | null;
  properties: Property[];
}

const center = {
  lat: 31.7917,
  lng: -7.0926,
};

const mapStyles = {
  width: "100%",
  height: "600px",
};

export const GoogleMapContainer = ({
  selectedLiveType,
  livesToShow,
  onMarkerClick,
  selectedLive,
  properties,
}: GoogleMapContainerProps) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  const createMarkerIcon = useCallback((type: 'current' | 'scheduled', isHovered: boolean) => {
    if (typeof window === 'undefined' || !window.google) return null;
    
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: type === 'current' ? '#ea384c' : '#0ea5e9',
      fillOpacity: 0.9,
      strokeWeight: 2,
      strokeColor: 'white',
      scale: isHovered ? 12 : 10,
    };
  }, []);

  // Filtrer les propriétés avec des lives
  const liveProperties = properties.filter(property => property.hasLive);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={center}
        zoom={6}
        onLoad={onLoad}
        options={{
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {liveProperties.map(property => {
          const isHovered = hoveredMarkerId === property.id;
          const isSelected = selectedLive?.id === property.id;
          const type = property.isLiveNow ? 'current' : 'scheduled';
          const icon = createMarkerIcon(type, isHovered || isSelected);

          if (!icon) return null;

          return (
            <Marker
              key={property.id}
              position={{
                lat: property.coordinates.lat,
                lng: property.coordinates.lng,
              }}
              onClick={() => onMarkerClick(property as any)}
              onMouseOver={() => setHoveredMarkerId(property.id)}
              onMouseOut={() => setHoveredMarkerId(null)}
              icon={icon}
              animation={isHovered && window.google ? window.google.maps.Animation.BOUNCE : undefined}
            >
              {(isSelected || isHovered) && (
                <InfoWindow onCloseClick={() => onMarkerClick(null)}>
                  <div className="max-w-sm">
                    <PropertyCard {...property} />
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};