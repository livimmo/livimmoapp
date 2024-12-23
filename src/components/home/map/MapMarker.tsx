import { PropertyCard } from "@/components/PropertyCard";
import { type Property } from "@/types/property";
import { InfoWindow, Marker } from "@react-google-maps/api";

interface MapMarkerProps {
  property: Property;
  isSelected: boolean;
  onClick: () => void;
  onClose: () => void;
}

export const MapMarker = ({ 
  property,
  isSelected,
  onClick,
  onClose
}: MapMarkerProps) => {
  return (
    <>
      <Marker
        position={{
          lat: property.coordinates.lat,
          lng: property.coordinates.lng
        }}
        onClick={onClick}
      />
      
      {isSelected && (
        <InfoWindow
          position={{
            lat: property.coordinates.lat,
            lng: property.coordinates.lng
          }}
          onCloseClick={onClose}
        >
          <div className="w-[300px]">
            <PropertyCard property={property} />
          </div>
        </InfoWindow>
      )}
    </>
  );
};