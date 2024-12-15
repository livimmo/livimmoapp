import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BottomNav } from "@/components/BottomNav";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Index = () => {
  // Position par défaut (Casablanca)
  const position: [number, number] = [33.5731, -7.5898];
  
  useEffect(() => {
    // Force a re-render of the map when the component mounts
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16">
      <main className="container mx-auto px-4 py-6">
        <section className="space-y-6">
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            {typeof window !== 'undefined' && (
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
            )}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;