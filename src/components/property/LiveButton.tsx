import { Video, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LiveButtonProps {
  id: number;
  title: string;
  liveDate?: Date;
  onJoinLive: () => void;
  isLiveNow?: boolean;
  remainingSeats?: number;
  isUserRegistered?: boolean;
}

export const LiveButton = ({ 
  id, 
  title, 
  liveDate, 
  onJoinLive,
  isLiveNow,
  remainingSeats = 15,
  isUserRegistered = false
}: LiveButtonProps) => {
  const { toast } = useToast();

  const handleRegistration = () => {
    toast({
      title: "Inscription confirmée !",
      description: "Vous recevrez un rappel avant le début du live.",
      duration: 5000,
    });
  };

  if (isLiveNow) {
    return (
      <Button 
        variant="default"
        className="w-full bg-[#ea384c] text-white hover:bg-[#ea384c]/90 animate-pulse"
        onClick={onJoinLive}
      >
        <Video className="mr-2 h-4 w-4" />
        Rejoindre le live
      </Button>
    );
  }

  if (liveDate && new Date(liveDate) > new Date()) {
    if (isUserRegistered) {
      return (
        <div className="space-y-2">
          <Button 
            variant="default"
            className="w-full bg-green-500 text-white hover:bg-green-500/90"
            disabled
          >
            <Users className="mr-2 h-4 w-4" />
            Inscrit au live
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Le {new Date(liveDate).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <Button 
          variant="default"
          className="w-full bg-primary text-white hover:bg-primary/90"
          onClick={handleRegistration}
        >
          <Calendar className="mr-2 h-4 w-4" />
          S'inscrire au live
        </Button>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {new Date(liveDate).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {remainingSeats} places
          </span>
        </div>
      </div>
    );
  }

  return null;
};