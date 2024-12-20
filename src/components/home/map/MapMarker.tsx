import { Property } from "@/types/property";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { Badge } from "@/components/ui/badge";
import { Circle, Calendar, PlayCircle } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";

interface MapMarkerProps {
  property: Property;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onInfoWindowClose: () => void;
}

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
  fillColor: '#3b82f6',
};

const replayMarkerIcon = {
  ...liveMarkerIcon,
  fillColor: '#8b5cf6',
};

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

export const MapMarker = ({
  property,
  isSelected,
  isHovered,
  onClick,
  onMouseOver,
  onMouseOut,
  onInfoWindowClose,
}: MapMarkerProps) => {
  return (
    <Marker
      position={{
        lat: property.coordinates.lat,
        lng: property.coordinates.lng,
      }}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      icon={getMarkerIcon(property)}
    >
      {(isSelected || isHovered) && (
        <InfoWindow
          position={{
            lat: property.coordinates.lat,
            lng: property.coordinates.lng,
          }}
          onCloseClick={onInfoWindowClose}
        >
          <div className="relative max-w-sm">
            <MarkerBadge property={property} />
            <PropertyCard {...property} />
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};