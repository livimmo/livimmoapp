import { Video } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const Logo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('.camera-icon')) {
      navigate('/lives?filter=live');
      toast({
        title: "Lives en cours",
        description: "Affichage des biens en live direct",
      });
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={handleLogoClick}
      >
        <Video className="h-5 w-5 text-primary camera-icon" />
        <span className="text-xl font-bold text-primary">
          Livimmo
        </span>
      </div>
      
      <nav className="hidden md:flex items-center gap-4">
        <Link 
          to="/properties" 
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Biens
        </Link>
        <Link 
          to="/developers" 
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Promoteurs
        </Link>
        <Link 
          to="/agents" 
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Agents
        </Link>
      </nav>
    </div>
  );
};