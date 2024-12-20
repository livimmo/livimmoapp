import { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Property } from "@/types/property";
import { LiveEvent } from "@/types/live";
import { MapMarker } from "./MapMarker";

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

export const GoogleMapContainer = ({
  properties,
  onMarkerClick,
}: GoogleMapContainerProps) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  // Ajuster dynamiquement les limites de la carte en fonction des propriétés
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

      // Ajuster le zoom si nécessaire
      const zoom = mapRef.getZoom();
      if (zoom && zoom > 15) {
        mapRef.setZoom(15);
      }
    }
  }, [mapRef, properties]);

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
            <MapMarker
              key={property.id}
              property={property}
              isSelected={selectedProperty?.id === property.id}
              isHovered={hoveredMarkerId === property.id}
              onClick={() => {
                setSelectedProperty(property);
                onMarkerClick?.(null);
              }}
              onMouseOver={() => setHoveredMarkerId(property.id)}
              onMouseOut={() => setHoveredMarkerId(null)}
              onInfoWindowClose={() => {
                setSelectedProperty(null);
                setHoveredMarkerId(null);
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};