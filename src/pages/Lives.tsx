import { AddLiveDialog } from "@/components/AddLiveDialog";
import { BottomNav } from "@/components/BottomNav";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";

// Mock data for upcoming lives with associated properties
const upcomingLives = [
  {
    id: 1,
    title: "Visite Villa Moderne",
    date: new Date(2024, 3, 15, 14, 30),
    type: "youtube",
    url: "https://youtube.com/live/xyz",
    description: "Découvrez cette magnifique villa avec piscine",
    property: {
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80",
      title: "Villa Moderne avec Piscine",
      price: 2500000,
      location: "Casablanca - Anfa",
      type: "Villa",
      surface: 300,
      rooms: 5,
      hasLive: true,
      liveDate: new Date(2024, 3, 15, 14, 30),
    }
  },
  {
    id: 2,
    title: "Appartement Vue Mer",
    date: new Date(2024, 3, 18, 16, 0),
    type: "whatsapp",
    url: "https://wa.me/123456789",
    description: "Visite exclusive d'un appartement front de mer",
    property: {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80",
      title: "Appartement Vue Mer",
      price: 1800000,
      location: "Rabat - Hassan",
      type: "Appartement",
      surface: 120,
      rooms: 3,
      hasLive: true,
      liveDate: new Date(2024, 3, 18, 16, 0),
    }
  }
];

const Lives = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="pb-20">
      <header className="bg-white shadow-sm p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Lives</h1>
        <AddLiveDialog />
      </header>

      <main className="container px-4">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Calendrier des Lives</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border w-full"
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Lives à venir</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingLives.map((live) => (
              <div key={live.id} className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
                  <h3 className="font-semibold text-lg">{live.title}</h3>
                  <p className="text-sm text-gray-500">
                    {live.date.toLocaleString()}
                  </p>
                  <p className="text-sm">{live.description}</p>
                  <div className="flex justify-end">
                    <a
                      href={live.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Rejoindre le live
                    </a>
                  </div>
                </div>
                {live.property && (
                  <PropertyCard {...live.property} />
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Lives;