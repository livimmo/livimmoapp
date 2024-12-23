import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import { type Property } from "@/types/property";

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <div className="h-full">
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={{
          lat: 31.7917,
          lng: -7.0926,
        }}
        zoom={6}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={{
              lat: property.coordinates.lat,
              lng: property.coordinates.lng,
            }}
            onClick={() => setSelectedProperty(property)}
          />
        ))}

        {selectedProperty && (
          <InfoWindow
            position={{
              lat: selectedProperty.coordinates.lat,
              lng: selectedProperty.coordinates.lng,
            }}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div className="w-[300px]">
              <PropertyCard property={selectedProperty} />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};
