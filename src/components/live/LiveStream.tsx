import { Video } from "lucide-react";

interface LiveStreamProps {
  videoId: string;
}

export const LiveStream = ({ videoId }: LiveStreamProps) => {
  return (
    <div className="absolute inset-0 bg-black">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};