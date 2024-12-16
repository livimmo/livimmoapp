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
    if (isLiveNow && onJoinLive) {
      if (isAuthenticated) {
        onJoinLive();
      } else {
        setShowLeadDialog(true);
      }
    } else if (!isLiveNow) {
      if (isAuthenticated) {
        if (isUserRegistered) {
          toast({
            title: "Vous êtes déjà inscrit à ce live",
            description: "Vous recevrez un rappel avant le début du live",
          });
        } else {
          setShowLeadDialog(true);
        }
      } else {
        setShowLeadDialog(true);
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant={isLiveNow ? "destructive" : "default"}
        className="w-full sm:w-auto"
      >
        <Video className="w-4 h-4 mr-2" />
        {isLiveNow ? "Rejoindre le live" : isUserRegistered ? "Live réservé" : "Réserver le live"}
      </Button>

      {showLeadDialog && (
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