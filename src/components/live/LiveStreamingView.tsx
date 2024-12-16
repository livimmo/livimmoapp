import { useState, useEffect } from "react";
import { LiveStreamingControls } from "./LiveStreamingControls";
import { LiveChat } from "./LiveChat";
import { LiveInfo } from "./LiveInfo";
import { Property } from "@/types/property";
import { useToast } from "@/hooks/use-toast";

interface LiveStreamingViewProps {
  property: Property;
  onEndStream: () => void;
}

export const LiveStreamingView = ({
  property,
  onEndStream,
}: LiveStreamingViewProps) => {
  const [viewerCount, setViewerCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate viewer count updates
    const interval = setInterval(() => {
      setViewerCount((prev) => Math.min(prev + Math.floor(Math.random() * 3), 100));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleEndStream = () => {
    toast({
      title: "Live terminé",
      description: "Le replay sera bientôt disponible",
    });
    onEndStream();
  };

  return (
    <div className="relative h-screen bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-pulse mb-4">
            EN DIRECT
          </div>
          <p className="text-sm opacity-75">
            Prévisualisation de la caméra
          </p>
        </div>
      </div>

      <div className="absolute bottom-20 left-4 right-4">
        <LiveInfo
          property={property}
          onMakeOffer={() => {}}
          viewerCount={viewerCount}
        />
      </div>

      <LiveStreamingControls
        viewerCount={viewerCount}
        onEndStream={handleEndStream}
      />
    </div>
  );
};