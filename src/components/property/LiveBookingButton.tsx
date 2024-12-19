import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LiveBookingForm } from "./live/LiveBookingForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface LiveBookingButtonProps {
  propertyId: number;
  propertyTitle: string;
  agentId?: number;
  agentName: string;
}

export const LiveBookingButton = ({
  propertyId,
  propertyTitle,
  agentId,
  agentName,
}: LiveBookingButtonProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLiveRequest = () => {
    toast({
      title: "Demande envoyée",
      description: "Votre demande de live a été envoyée à l'agent.",
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2">
          <Video className="h-4 w-4" />
          Réserver un live
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Réserver un live privé</DialogTitle>
        </DialogHeader>
        {user ? (
          <LiveBookingForm
            propertyId={propertyId}
            propertyTitle={propertyTitle}
            agentId={agentId || 0}
            agentName={agentName}
            onClose={() => setOpen(false)}
          />
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">
              Connectez-vous pour réserver un live privé
            </p>
            <Button onClick={() => window.location.href = "/login"}>
              Se connecter
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};