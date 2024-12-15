import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

// Création d'icônes personnalisées pour les propriétés
const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

const liveIcon = createCustomIcon('#ea384c'); // Rouge pour les propriétés en live
const regularIcon = createCustomIcon('#2563EB'); // Bleu pour les propriétés normales

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  image?: string;
  hasLive?: boolean;
}

interface PropertyMapProps {
  properties: Property[];
}

// Fonction pour générer des coordonnées aléatoires au Maroc pour la démo
const getRandomMaroccoCoordinates = () => {
  // Limites approximatives du Maroc
  const lat = 28 + Math.random() * 8; // Entre 28°N et 36°N
  const lng = -11 + Math.random() * 7; // Entre -11°W et -4°W
  return [lat, lng] as [number, number];
};

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  // Centre sur le Maroc
  const defaultCenter: [number, number] = [31.7917, -7.0926];
  const defaultZoom = 6;

  useEffect(() => {
    // Force le recalcul de la taille de la carte après le montage
    const map = document.querySelector('.leaflet-container');
    if (map) {
      window.dispatchEvent(new Event('resize'));
    }
  }, []);

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
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
              icon={property.hasLive ? liveIcon : regularIcon}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  {property.image && (
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                  )}
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                  <p className="text-primary font-semibold">
                    {property.price.toLocaleString()} DH
                  </p>
                  {property.hasLive && (
                    <Button size="sm" className="w-full mt-2 bg-[#ea384c] hover:bg-[#ea384c]/90">
                      <Video className="mr-2 h-4 w-4" />
                      Voir le live
                    </Button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};