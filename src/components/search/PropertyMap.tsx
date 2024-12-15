import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { type Property } from "@/pages/Properties";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  // Default to Casablanca coordinates if no properties
  const defaultCenter = [33.5731, -7.5898];

  return (
    <div className="h-[500px] w-full">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => (
          <Marker 
            key={property.id} 
            position={defaultCenter}
            icon={icon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{property.title}</h3>
                <p className="text-sm">{property.price.toLocaleString()} DH</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};