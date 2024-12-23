import { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Property } from "@/types/property";
import { LiveStream, ScheduledLive } from "@/types/live";

interface GoogleMapContainerProps {
  properties: Property[];
  selectedLive: LiveStream | ScheduledLive | null;
  onMarkerClick: (live: LiveStream | ScheduledLive | null) => void;
}

export const GoogleMapContainer = ({ properties, selectedLive, onMarkerClick }: GoogleMapContainerProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const center = {
    lat: 31.6295,
    lng: -7.9811,
  };

  const handleMarkerClick = (property: Property) => {
    const live = properties.find(p => p.id === property.id);
    onMarkerClick(live || null);
  };

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

      {selectedLive && (
        <InfoWindow
          position={properties.find(p => p.id === selectedLive.id)?.coordinates || center}
          onCloseClick={() => onMarkerClick(null)}
        >
          <div>
            <h3 className="font-semibold">{selectedLive.title}</h3>
            <p className="text-sm text-gray-600">{selectedLive.location}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};