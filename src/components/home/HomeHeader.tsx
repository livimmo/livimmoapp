import { Video, Bell, User, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const HomeHeader = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
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
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={handleLogoClick}
        >
          <Video className="h-5 w-5 text-[#ea384c] camera-icon" />
          <h1 className="text-xl font-bold text-primary">
            Livimmo
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/notifications')}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  3
                </span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/profile')}
              >
                <User className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate('/signup')}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                S'inscrire
              </Button>
              <Button 
                variant="default"
                size="sm"
                onClick={() => navigate('/login')}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Connexion
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};