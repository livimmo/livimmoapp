import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { LiveStreamingSetup } from "@/components/live/LiveStreamingSetup";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Property } from "@/types/property";

interface AddLiveButtonProps {
  property: Property;
}

export const AddLiveButton = ({ property }: AddLiveButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const isAgentOrPromoter = user?.role === "agent" || user?.role === "promoter";

  if (!isAgentOrPromoter) {
    return null;
  }

  const handleStartStream = (config: any) => {
    toast({
      title: "Live configuré avec succès",
      description: `Le live pour "${property.title}" a été ${config.startNow ? 'démarré' : 'programmé'}.`,
    });
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        className="w-full"
        variant="outline"
      >
        <Video className="w-4 h-4 mr-2" />
        Ajouter un Live
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configurer un nouveau live</DialogTitle>
          </DialogHeader>
          <LiveStreamingSetup 
            properties={[property]}
            onStartStream={handleStartStream}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};