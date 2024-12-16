import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Video } from "lucide-react";
import { LiveStreamingSetup } from "./live/LiveStreamingSetup";
import { LiveStreamingView } from "./live/LiveStreamingView";
import { mockProperties } from "@/data/mockProperties";

export const AddLiveDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleStartStream = (config) => {
    const property = mockProperties.find(p => p.id === config.propertyId);
    setSelectedProperty(property);
    setIsStreaming(true);
  };

  const handleEndStream = () => {
    setIsStreaming(false);
    setIsOpen(false);
    setSelectedProperty(null);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        <Video className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={isStreaming ? "max-w-full h-screen p-0 bg-black" : "max-w-lg"}>
          {!isStreaming ? (
            <>
              <DialogHeader>
                <DialogTitle>Démarrer un live</DialogTitle>
              </DialogHeader>
              <LiveStreamingSetup
                properties={mockProperties}
                onStartStream={handleStartStream}
              />
            </>
          ) : (
            <LiveStreamingView
              property={selectedProperty}
              onEndStream={handleEndStream}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};