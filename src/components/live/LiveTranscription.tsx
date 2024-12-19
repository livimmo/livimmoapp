import { useState, useEffect } from "react";
import { pipeline } from "@huggingface/transformers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface LiveTranscriptionProps {
  isReplay?: boolean;
}

export const LiveTranscription = ({ isReplay }: LiveTranscriptionProps) => {
  const [transcription, setTranscription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initTranscription = async () => {
      try {
        const transcriber = await pipeline(
          "automatic-speech-recognition",
          "onnx-community/whisper-tiny.fr",
          { device: "cpu" }
        );

        // Simulation de transcription pour le moment
        setInterval(() => {
          const mockTranscriptions = [
            "Bienvenue dans cette visite virtuelle",
            "Comme vous pouvez le voir, la pièce est très lumineuse",
            "La cuisine est entièrement équipée",
            "Le salon donne directement sur la terrasse",
          ];
          
          setTranscription(mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)]);
        }, 5000);

        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la transcription:", error);
        setIsLoading(false);
      }
    };

    initTranscription();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="ml-2 text-sm">Chargement de la transcription...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            Transcription en direct
          </Badge>
        </div>
        <ScrollArea className="h-20">
          <p className="text-sm text-muted-foreground">{transcription}</p>
        </ScrollArea>
      </div>
    </div>
  );
};