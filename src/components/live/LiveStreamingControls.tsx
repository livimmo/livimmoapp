import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Mic, PhoneOff, RotateCcw, Users, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LiveStreamingControlsProps {
  viewerCount: number;
  onEndStream: () => void;
  showDescription: boolean;
  onToggleDescription: () => void;
}

export const LiveStreamingControls = ({
  viewerCount,
  onEndStream,
  showDescription,
  onToggleDescription,
}: LiveStreamingControlsProps) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const { toast } = useToast();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-sm rounded-full p-4 flex items-center gap-4">
      <div className="px-4 flex items-center gap-2 text-white">
        <Users className="h-4 w-4" />
        <span className="font-medium">{viewerCount}</span>
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
        variant="outline"
        size="icon"
        onClick={onToggleDescription}
      >
        {showDescription ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>

      <Button
        variant="destructive"
        size="icon"
        onClick={onEndStream}
      >
        <PhoneOff className="h-4 w-4" />
      </Button>
    </div>
  );
};