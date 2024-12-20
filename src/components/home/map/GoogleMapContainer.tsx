import { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Property } from "@/types/property";
import { LiveEvent } from "@/types/live";
import { PropertyCard } from "@/components/PropertyCard";

interface GoogleMapContainerProps {
  properties: Property[];
  selectedLive?: LiveEvent | null;
  onMarkerClick?: (live: LiveEvent | null) => void;
}

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "400px",
};

const defaultCenter = {
  lat: 31.7917,
  lng: -7.0926,
};

export const GoogleMapContainer = ({
  properties,
}: GoogleMapContainerProps) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);

  // Filtrer pour ne garder que les propriétés avec des lives en cours
  const liveProperties = properties.filter(property => property.hasLive && property.isLiveNow);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  useEffect(() => {
    if (mapRef && liveProperties.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      liveProperties.forEach((property) => {
        bounds.extend({
          lat: property.coordinates.lat,
          lng: property.coordinates.lng,
        });
      });
      mapRef.fitBounds(bounds);
    }
  }, [mapRef, liveProperties]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={
          liveProperties.length > 0
            ? {
                lat: liveProperties[0].coordinates.lat,
                lng: liveProperties[0].coordinates.lng,
              }
            : defaultCenter
        }
        zoom={6}
        onLoad={onLoad}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
        }}
      >
        {liveProperties.map((property) => (
          <Marker
            key={property.id}
            position={{
              lat: property.coordinates.lat,
              lng: property.coordinates.lng,
            }}
            onClick={() => setSelectedProperty(property)}
            onMouseOver={() => setHoveredMarkerId(property.id)}
            onMouseOut={() => setHoveredMarkerId(null)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#ea384c',
              fillOpacity: 0.9,
              strokeWeight: 2,
              strokeColor: 'white',
              scale: hoveredMarkerId === property.id ? 12 : 10,
            }}
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
                <div className="max-w-sm">
                  <PropertyCard {...property} />
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};