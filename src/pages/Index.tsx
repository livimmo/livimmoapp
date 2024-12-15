import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const Index = () => {
  // Position par défaut (Casablanca)
  const position: [number, number] = [33.5731, -7.5898];
  
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6">
        <section className="space-y-6">
          <div className="h-[400px] w-full rounded-lg overflow-hidden">
            <MapContainer 
              center={position} 
              zoom={13} 
              style={{ height: "100%", width: "100%" }}
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