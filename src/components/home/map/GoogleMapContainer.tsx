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

const markerIcon = {
  path: "M -1, -1 1, -1 1, 1 -1, 1",
  fillColor: '#ea384c',
  fillOpacity: 0.9,
  strokeWeight: 2,
  strokeColor: 'white',
  scale: 10,
};

const hoverMarkerIcon = {
  ...markerIcon,
  scale: 12,
};

export const GoogleMapContainer = ({
  properties,
}: GoogleMapContainerProps) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Filter properties with valid coordinates and live status
  const liveProperties = properties.filter(property => 
    property.hasLive && 
    property.isLiveNow && 
    property.coordinates && 
    typeof property.coordinates.lat === 'number' && 
    typeof property.coordinates.lng === 'number'
  );

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (mapRef && isLoaded && liveProperties.length > 0) {
      try {
        const bounds = new window.google.maps.LatLngBounds();
        liveProperties.forEach((property) => {
          if (property.coordinates && 
              typeof property.coordinates.lat === 'number' && 
              typeof property.coordinates.lng === 'number') {
            bounds.extend({
              lat: property.coordinates.lat,
              lng: property.coordinates.lng,
            });
          }
        });
        mapRef.fitBounds(bounds);
      } catch (error) {
        console.error("Error adjusting map bounds:", error);
      }
    }
  }, [mapRef, liveProperties, isLoaded]);

  const handlePropertySelect = (property: Property) => {
    // Create a serializable copy of the property object
    const serializableProperty = {
      ...property,
      coordinates: {
        lat: property.coordinates.lat,
        lng: property.coordinates.lng,
      }
    };
    setSelectedProperty(serializableProperty);
  };

  return (
    <LoadScript 
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      onLoad={() => setIsLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={
          liveProperties.length > 0 && liveProperties[0].coordinates
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
        {isLoaded && liveProperties.map((property) => (
          <Marker
            key={property.id}
            position={{
              lat: property.coordinates.lat,
              lng: property.coordinates.lng,
            }}
            onClick={() => handlePropertySelect(property)}
            onMouseOver={() => setHoveredMarkerId(property.id)}
            onMouseOut={() => setHoveredMarkerId(null)}
            icon={hoveredMarkerId === property.id ? hoverMarkerIcon : markerIcon}
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