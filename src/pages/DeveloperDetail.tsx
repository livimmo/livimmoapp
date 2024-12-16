import { useParams } from "react-router-dom";
import { developers } from "@/data/mockDevelopers";
import { StarRating } from "@/components/ratings/StarRating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveCard } from "@/components/live/LiveCard";
import { liveStreams, scheduledLives } from "@/data/mockLives";

const DeveloperDetail = () => {
  const { id } = useParams();
  const developer = developers.find(d => d.id === Number(id));

  if (!developer) {
    return <div>Promoteur non trouvé</div>;
  }

  // Filter lives for this developer (mock filtering)
  const activeLives = liveStreams.slice(0, developer.activeLives);
  const upcomingLives = scheduledLives.slice(0, developer.scheduledLives);

  return (
    <div className="container px-4 py-6 pb-20">
      <div className="relative h-48 mb-8 rounded-lg overflow-hidden">
        <img
          src={developer.logo}
          alt={developer.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{developer.name}</h1>
            <p className="text-muted-foreground">{developer.location}</p>
          </div>
          <StarRating rating={developer.rating} totalReviews={developer.totalReviews} />
        </div>

        <p className="text-lg">{developer.description}</p>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="active" className="flex-1">
              Lives en cours ({activeLives.length})
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="flex-1">
              Lives programmés ({upcomingLives.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeLives.map((live) => (
                <LiveCard key={live.id} live={live} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scheduled">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingLives.map((live) => (
                <LiveCard key={live.id} live={live} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeveloperDetail;