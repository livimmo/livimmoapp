import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";

const properties = [
  {
    id: 1,
    image: "/placeholder.svg",
    title: "Villa Moderne avec Piscine",
    price: 2500000,
    location: "Casablanca - Anfa",
    type: "Villa",
    surface: 300,
    rooms: 5,
  },
  {
    id: 2,
    image: "/placeholder.svg",
    title: "Appartement Vue Mer",
    price: 1800000,
    location: "Rabat - Hassan",
    type: "Appartement",
    surface: 120,
    rooms: 3,
  },
  {
    id: 3,
    image: "/placeholder.svg",
    title: "Duplex de Luxe",
    price: 3200000,
    location: "Marrakech - Guéliz",
    type: "Duplex",
    surface: 200,
    rooms: 4,
  },
];

const Index = () => {
  return (
    <div className="pb-20">
      <header className="bg-white shadow-sm p-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Découvrez nos biens</h1>
      </header>

      <main className="container px-4">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Biens en vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Prochains Lives</h2>
          <div className="bg-accent rounded-lg p-4">
            <p className="text-center text-gray-500">
              Aucune visite en direct programmée pour le moment
            </p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;