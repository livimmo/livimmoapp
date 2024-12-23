import { Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const Logo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogoClick = () => {
    navigate('/');
    toast({
      title: "Bienvenue",
      description: "Vous êtes sur la page d'accueil",
    });
  };

  return (
    <div 
      className="flex items-center gap-1.5 cursor-pointer" 
      onClick={handleLogoClick}
    >
      <Video className="h-4 w-4 text-[#ea384c] camera-icon" />
      <h1 className="text-lg font-bold text-primary">
        Livimmo
      </h1>
    </div>
  );
};