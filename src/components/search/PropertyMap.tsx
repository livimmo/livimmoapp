import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { type Property } from "@/types/property";
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

// Fonction pour générer des coordonnées aléatoires au Maroc
const getRandomMaroccoCoordinates = (): [number, number] => {
  const lat = 28 + Math.random() * 8; // Entre 28°N et 36°N
  const lng = -11 + Math.random() * 7; // Entre -11°W et -4°W
  return [lat, lng];
};

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  // Centre sur Casablanca par défaut
  const defaultCenter: [number, number] = [33.5731, -7.5898];

  return (
    <div className="h-[500px] w-full">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => {
          const coordinates = getRandomMaroccoCoordinates();
          return (
            <Marker 
              key={property.id} 
              position={coordinates}
              icon={icon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm">{property.price.toLocaleString()} DH</p>
                  <p className="text-sm text-gray-500">{property.location}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};