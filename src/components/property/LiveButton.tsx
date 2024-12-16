import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ReservationForm } from "@/components/home/ReservationForm";

interface LiveButtonProps {
  id: number;
  title: string;
  onJoinLive?: () => void;
  isLiveNow?: boolean;
  isUserRegistered?: boolean;
}

export const LiveButton = ({
  id,
  title,
  onJoinLive,
  isLiveNow,
  isUserRegistered,
}: LiveButtonProps) => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [showLeadDialog, setShowLeadDialog] = useState(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowLeadDialog(true);
      return;
    }

    if (isLiveNow && onJoinLive) {
      onJoinLive();
    } else {
      toast({
        title: "Inscription confirmée !",
        description: "Vous recevrez un rappel avant le début du live.",
      });
    }
  };

  if (isLiveNow) {
    return (
      <>
        <Button 
          variant="default"
          className="w-full bg-[#ea384c] text-white hover:bg-[#ea384c]/90 animate-pulse"
          onClick={handleClick}
        >
          <Users className="mr-2 h-4 w-4" />
          Rejoindre le live
        </Button>

        <Dialog open={showLeadDialog} onOpenChange={setShowLeadDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Inscrivez-vous pour rejoindre le live</DialogTitle>
            </DialogHeader>
            <ReservationForm 
              live={{ 
                id, 
                title, 
                date: new Date() 
              }} 
              onClose={() => setShowLeadDialog(false)} 
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  if (isUserRegistered) {
    return (
      <Button 
        variant="default"
        className="w-full bg-green-500 text-white hover:bg-green-500/90"
        disabled
      >
        <Users className="mr-2 h-4 w-4" />
        Inscrit au live
      </Button>
    );
  }

  return (
    <>
      <Button 
        variant="default"
        className="w-full bg-primary text-white hover:bg-primary/90"
        onClick={handleClick}
      >
        <Users className="mr-2 h-4 w-4" />
        S'inscrire au live
      </Button>

      <Dialog open={showLeadDialog} onOpenChange={setShowLeadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inscrivez-vous au live</DialogTitle>
          </DialogHeader>
          <ReservationForm 
            live={{ 
              id, 
              title, 
              date: new Date() 
            }} 
            onClose={() => setShowLeadDialog(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};