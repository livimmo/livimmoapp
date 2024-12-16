import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Users } from "lucide-react";

interface LiveButtonProps {
  id: number;
  title: string;
  onJoinLive?: () => void;
  isLiveNow?: boolean;
  isUserRegistered?: boolean;
}

export const LiveButton = ({
  onJoinLive,
  isLiveNow,
  isUserRegistered,
}: LiveButtonProps) => {
  const { toast } = useToast();

  const handleRegistration = () => {
    toast({
      title: "Inscription confirmée !",
      description: "Vous recevrez un rappel avant le début du live.",
    });
  };

  if (isLiveNow) {
    return (
      <Button 
        variant="default"
        className="w-full bg-[#ea384c] text-white hover:bg-[#ea384c]/90 animate-pulse"
        onClick={onJoinLive}
      >
        <Users className="mr-2 h-4 w-4" />
        Rejoindre le live
      </Button>
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
    <Button 
      variant="default"
      className="w-full bg-primary text-white hover:bg-primary/90"
      onClick={handleRegistration}
    >
      <Users className="mr-2 h-4 w-4" />
      S'inscrire au live
    </Button>
  );
};