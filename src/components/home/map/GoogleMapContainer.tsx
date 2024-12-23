import { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Property } from "@/types/property";

interface GoogleMapContainerProps {
  properties: Property[];
  selectedPropertyId: string | null;
  onPropertySelect: (propertyId: string) => void;
}

const GoogleMapContainer = ({ properties, selectedPropertyId, onPropertySelect }: GoogleMapContainerProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const center = {
    lat: 31.6295,
    lng: -7.9811,
  };

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
    onPropertySelect(property.id);
  };

  useEffect(() => {
    if (selectedPropertyId) {
      const property = properties.find(p => p.id === selectedPropertyId);
      setSelectedProperty(property || null);
    } else {
      setSelectedProperty(null);
    }
  }, [selectedPropertyId, properties]);

  return (
    <GoogleMap
      onLoad={map => setMap(map)}
      center={center}
      zoom={10}
      mapContainerClassName="h-full w-full"
    >
      {properties.map(property => (
        <Marker
          key={property.id}
          position={property.coordinates}
          onClick={() => handleMarkerClick(property)}
        />
      ))}

      {selectedProperty && (
        <InfoWindow
          position={selectedProperty.coordinates}
          onCloseClick={() => setSelectedProperty(null)}
        >
          <div>
            <h3>{selectedProperty.title}</h3>
            <p>{selectedProperty.location}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default GoogleMapContainer;
