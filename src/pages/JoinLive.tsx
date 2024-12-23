import { LiveStream } from "@/components/live/LiveStream";
import { useParams } from "react-router-dom";
import { liveStreams } from "@/data/mockLives";

export const LiveStream = () => {
  const { id } = useParams();
  const currentLive = liveStreams.find(live => live.id === Number(id));
  const otherLives = liveStreams.filter(live => live.id !== Number(id));

  if (!currentLive) {
    return <div>Live non trouvé</div>;
  }

  return (
    <LiveStream
      videoId={currentLive.videoId || ""}
      currentLiveId={currentLive.id}
      otherLives={otherLives}
      onLiveChange={(liveId) => {
        // Handle live change
        console.log("Changing to live:", liveId);
      }}
    />
  );
};