import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ReservationForm } from "@/components/home/ReservationForm";
import { useToast } from "@/components/ui/use-toast";

interface LiveButtonProps {
  id: number;
  title: string;
  liveDate?: Date;
  onJoinLive?: () => void;
  isLiveNow?: boolean;
  isUserRegistered?: boolean;
  remainingSeats?: number;
}

export const LiveButton = ({
  id,
  title,
  liveDate,
  onJoinLive,
  isLiveNow,
  isUserRegistered,
  remainingSeats,
}: LiveButtonProps) => {
  const { isAuthenticated } = useAuth();
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  const { toast } = useToast();

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowLeadDialog(true);
      return;
    }

    if (isLiveNow && onJoinLive) {
      onJoinLive();
    } else {
      if (isUserRegistered) {
        toast({
          title: "Vous êtes déjà inscrit à ce live",
          description: "Vous recevrez un rappel avant le début du live",
        });
      } else {
        // Si l'utilisateur est connecté, on l'inscrit directement
        toast({
          title: "Inscription confirmée !",
          description: "Vous recevrez un rappel avant le début du live",
        });
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant={isLiveNow ? "destructive" : "default"}
        className="w-full"
      >
        <Video className="w-4 h-4 mr-2" />
        {isLiveNow 
          ? "Rejoindre le live" 
          : isAuthenticated 
            ? isUserRegistered 
              ? "Live réservé" 
              : "S'inscrire au live"
            : "Réserver le live"
        }
      </Button>

      {!isAuthenticated && showLeadDialog && (
        <ReservationForm
          live={{
            id,
            title,
            date: liveDate || new Date(),
          }}
          onClose={() => setShowLeadDialog(false)}
        />
      )}
    </>
  );
};