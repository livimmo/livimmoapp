import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  // Position par défaut (Casablanca)
  const position = {
    lat: 33.5731,
    lon: -7.5898,
    zoom: 13
  };
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <main className="container mx-auto px-4 py-6">
        <section className="space-y-6">
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${position.lon - 0.1},${position.lat - 0.1},${position.lon + 0.1},${position.lat + 0.1}&layer=mapnik&marker=${position.lat},${position.lon}`}
              style={{ border: 0 }}
              title="OpenStreetMap Casablanca"
            />
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;