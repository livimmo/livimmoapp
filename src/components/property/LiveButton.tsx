import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, History, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ReservationForm } from "@/components/home/ReservationForm";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LiveButtonProps {
  id: number;
  title: string;
  liveDate?: Date;
  onJoinLive?: () => void;
  isLiveNow?: boolean;
  isUserRegistered?: boolean;
  remainingSeats?: number;
  isReplay?: boolean;
}

export const LiveButton = ({
  id,
  title,
  liveDate,
  onJoinLive,
  isLiveNow,
  isUserRegistered,
  remainingSeats,
  isReplay,
}: LiveButtonProps) => {
  const { isAuthenticated } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegistration = () => {
    setIsClicked(true);
    setTimeout(() => {
      toast({
        title: "Inscription confirmée !",
        description: `Votre place pour "${title}" a été réservée. Vous recevrez un email de confirmation.`,
      });
      setIsClicked(false);
    }, 300);
  };

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    if (isLiveNow && onJoinLive) {
      onJoinLive();
    } else if (isReplay) {
      navigate(`/replay/${id}`);
    } else {
      if (isUserRegistered) {
        toast({
          title: "Vous êtes déjà inscrit à ce live",
          description: "Vous recevrez un rappel avant le début du live",
        });
      } else {
        handleRegistration();
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant={isReplay ? "secondary" : "default"}
        className={cn(
          "w-full transition-all duration-300 transform",
          isLiveNow ? "bg-[#ea384c] hover:bg-[#ea384c]/90" : "",
          isClicked && "scale-95 opacity-80",
          "hover:scale-105 active:scale-95"
        )}
      >
        {isReplay ? (
          <History className={cn("w-4 h-4 mr-2", isClicked && "animate-spin")} />
        ) : isLiveNow ? (
          <Play className={cn("w-4 h-4 mr-2", isClicked && "animate-pulse")} />
        ) : (
          <Calendar className={cn("w-4 h-4 mr-2", isClicked && "animate-bounce")} />
        )}
        {isLiveNow 
          ? "Rejoindre le live" 
          : isReplay
          ? "Voir le replay"
          : isAuthenticated 
            ? isUserRegistered 
              ? "Live réservé" 
              : "S'inscrire au live"
            : "Réserver le live"
        }
      </Button>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[425px] animate-in fade-in-0 zoom-in-95">
          <DialogHeader>
            <DialogTitle>Connexion requise</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Pour accéder à ce live, vous devez avoir un compte Livimmo.</p>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="w-full hover:scale-105 transition-transform"
                onClick={() => navigate("/signup")}
              >
                Créer un compte
              </Button>
              <Button 
                className="w-full hover:scale-105 transition-transform"
                onClick={() => navigate("/login")}
              >
                Se connecter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};