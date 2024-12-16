import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Mic, PhoneOff, RotateCcw, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LiveStreamingControlsProps {
  viewerCount: number;
  onEndStream: () => void;
}

export const LiveStreamingControls = ({
  viewerCount,
  onEndStream,
}: LiveStreamingControlsProps) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const { toast } = useToast();

  const handleEndStream = () => {
    toast({
      title: "Live terminé",
      description: "Votre live a été enregistré et sera disponible en replay",
    });
    onEndStream();
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-sm rounded-full p-4 flex items-center gap-4">
      <div className="px-4 flex items-center gap-2 text-white">
        <Users className="h-4 w-4" />
        <span>{viewerCount}</span>
      </div>

      <Button
        variant={isCameraOn ? "default" : "outline"}
        size="icon"
        onClick={() => setIsCameraOn(!isCameraOn)}
      >
        <Camera className="h-4 w-4" />
      </Button>

      <Button
        variant={isMicOn ? "default" : "outline"}
        size="icon"
        onClick={() => setIsMicOn(!isMicOn)}
      >
        <Mic className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setIsCameraOn(true);
          setIsMicOn(true);
        }}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>

      <Button
        variant="destructive"
        size="icon"
        onClick={handleEndStream}
      >
        <PhoneOff className="h-4 w-4" />
      </Button>
    </div>
  );
};