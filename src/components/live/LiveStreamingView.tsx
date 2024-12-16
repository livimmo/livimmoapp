import { useState, useEffect } from "react";
import { LiveStreamingControls } from "./LiveStreamingControls";
import { LiveChat } from "./LiveChat";
import { LiveInfo } from "./LiveInfo";
import { Property } from "@/types/property";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LiveStreamingViewProps {
  property: Property;
  onEndStream: () => void;
}

export const LiveStreamingView = ({
  property,
  onEndStream,
}: LiveStreamingViewProps) => {
  const [viewerCount, setViewerCount] = useState(0);
  const [showDescription, setShowDescription] = useState(true);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate viewer count updates
    const interval = setInterval(() => {
      setViewerCount((prev) => Math.min(prev + Math.floor(Math.random() * 3), 100));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleEndStream = () => {
    setShowEndDialog(true);
  };

  const confirmEndStream = () => {
    toast({
      title: "Live terminé",
      description: "Le replay sera bientôt disponible",
    });
    setShowEndDialog(false);
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

      {showDescription && (
        <div className="absolute bottom-20 left-4 right-4">
          <LiveInfo
            property={property}
            onMakeOffer={() => {}}
            viewerCount={viewerCount}
            onToggleChat={() => setShowChat(!showChat)}
          />
        </div>
      )}

      <LiveStreamingControls
        viewerCount={viewerCount}
        onEndStream={handleEndStream}
        showDescription={showDescription}
        onToggleDescription={() => setShowDescription(!showDescription)}
      />

      {showChat && (
        <div className="absolute top-0 right-0 bottom-0 w-80 z-[100]">
          <LiveChat 
            messages={[]} 
            onClose={() => setShowChat(false)}
          />
        </div>
      )}

      <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Arrêter le live ?</AlertDialogTitle>
            <AlertDialogDescription>
              Voulez-vous vraiment arrêter le live ? Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEndStream} className="bg-red-500 hover:bg-red-600">
              Arrêter le live
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};