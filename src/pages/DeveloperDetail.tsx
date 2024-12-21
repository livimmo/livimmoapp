import { useParams } from "react-router-dom";
import { developers } from "@/data/mockDevelopers";
import { replayLives, liveStreams, scheduledLives } from "@/data/mockLives";
import { CurrentLivesSection } from "@/components/home/sections/CurrentLivesSection";
import { ScheduledLivesSection } from "@/components/home/sections/ScheduledLivesSection";
import { ReplayLivesSection } from "@/components/home/sections/ReplayLivesSection";

const DeveloperDetail = () => {
  const { id } = useParams();
  const developer = developers.find((dev) => dev.id === Number(id));

  if (!developer) {
    return <div>Promoteur non trouvé</div>;
  }

  // Filtrer les lives pour ce promoteur spécifique (simulation)
  const developerCurrentLives = liveStreams.slice(0, 2);
  const developerScheduledLives = scheduledLives.slice(0, 3);
  const developerReplayLives = replayLives.slice(0, 3);

  return (
    <div className="container px-4 py-8 space-y-8">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={developer.logo}
            alt={developer.name}
            className="w-24 h-24 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold">{developer.name}</h1>
            <p className="text-muted-foreground">{developer.location}</p>
          </div>
        </div>
        <p className="text-lg">{developer.description}</p>
      </header>

      <div className="space-y-8">
        {developerCurrentLives.length > 0 && (
          <CurrentLivesSection currentLives={developerCurrentLives} />
        )}

        {developerScheduledLives.length > 0 && (
          <ScheduledLivesSection scheduledLives={developerScheduledLives} />
        )}

        {developerReplayLives.length > 0 && (
          <ReplayLivesSection replayLives={developerReplayLives} />
        )}
      </div>
    </div>
  );
};

export default DeveloperDetail;