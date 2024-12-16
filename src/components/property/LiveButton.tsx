import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ReservationForm } from "@/components/home/ReservationForm";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

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
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
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
        setShowLeadDialog(true);
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

      {/* Dialog pour utilisateurs non connectés */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connexion requise</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Pour accéder à ce live, vous devez avoir un compte Livimmo.</p>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/signup")}
              >
                Créer un compte
              </Button>
              <Button 
                className="w-full"
                onClick={() => navigate("/login")}
              >
                Se connecter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog pour réservation (utilisateurs connectés) */}
      {showLeadDialog && (
        <ReservationForm
          live={{
            id,
            title,
            date: liveDate || new Date(),
            availableSeats: remainingSeats,
          }}
          onClose={() => setShowLeadDialog(false)}
        />
      )}
    </>
  );
};