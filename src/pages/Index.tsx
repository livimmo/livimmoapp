import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const Index = () => {
  // Position par défaut (Casablanca)
  const position: [number, number] = [33.5731, -7.5898];
  
  useEffect(() => {
    // Force a re-render of the map when the component mounts
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6">
        <section className="space-y-6">
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <MapContainer 
              center={position} 
              zoom={13} 
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  Casablanca, Maroc
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;