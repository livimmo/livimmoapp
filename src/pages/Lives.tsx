import { LiveCalendarView } from "@/components/live/LiveCalendarView";
import { ScheduledLivesList } from "@/components/live/ScheduledLivesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { scheduledLives, liveStreams } from "@/data/mockLives";
import { PropertyCard } from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";

const Lives = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-12 space-y-8">
      {/* Section des lives en cours */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          Lives en cours
        </h2>
        
        {liveStreams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveStreams.map((live) => (
              <PropertyCard
                key={live.id}
                id={live.id}
                title={live.title}
                price={parseInt(live.price.replace(/[^\d]/g, ""))}
                location={live.location}
                type={live.type}
                surface={0}
                rooms={0}
                bathrooms={0}
                description={live.description || ""}
                features={[]}
                images={[live.thumbnail]}
                hasLive={true}
                liveDate={live.date}
                agent={{
                  name: live.agent,
                  image: "",
                  phone: "",
                  email: "",
                }}
                coordinates={{
                  lat: 0,
                  lng: 0,
                }}
                isLiveNow={true}
                viewers={live.viewers}
                remainingSeats={live.availableSeats}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center text-muted-foreground">
            Aucun live en cours pour le moment
          </Card>
        )}
      </section>

      {/* Section des lives programmés */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Lives programmés</h2>
        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">Liste</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <ScheduledLivesList lives={scheduledLives} />
          </TabsContent>
          <TabsContent value="calendar">
            <LiveCalendarView scheduledLives={scheduledLives} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Lives;