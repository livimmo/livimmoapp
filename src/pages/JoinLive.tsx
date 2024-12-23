import { LiveStream } from "@/components/live/LiveStream";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { liveStreams } from "@/data/mockLives";
import { type LiveEvent } from "@/types/live";

const JoinLive = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLive, setCurrentLive] = useState<LiveEvent | null>(null);
  const [otherLives, setOtherLives] = useState<LiveEvent[]>([]);

  useEffect(() => {
    const live = liveStreams.find(live => live.id === Number(id));
    if (!live) {
      navigate("/lives");
      return;
    }
    setCurrentLive(live);
    setOtherLives(liveStreams.filter(l => l.id !== Number(id)));
  }, [id, navigate]);

  if (!currentLive) return null;

  return (
    <LiveStream
      videoId={currentLive.videoId || ""}
      currentLiveId={Number(id)}
      otherLives={otherLives}
      onLiveChange={(liveId) => navigate(`/live/${liveId}`)}
    />
  );
};

export default JoinLive;