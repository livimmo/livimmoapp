import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.toString(),
  iconRetinaUrl: markerIcon2x.toString(),
  shadowUrl: markerShadow.toString(),
});

interface PropertyLocationMapProps {
  title: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const PropertyLocationMap = ({ title, location, coordinates }: PropertyLocationMapProps) => {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};