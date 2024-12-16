import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AddPropertyDialog } from "@/components/property/AddPropertyDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Bell, LogIn, User, UserPlus, Video } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { toast } = useToast();
  const [showNotifications, setShowNotifications] = useState(false);

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

  const handleNotificationsClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour accéder aux notifications",
      });
      navigate('/login');
    } else {
      setShowNotifications(!showNotifications);
      navigate('/notifications');
    }
  };

  const isAgentOrPromoter = user?.role === 'agent' || user?.role === 'promoter';
  const isHomePage = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
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
                {isAgentOrPromoter && isHomePage && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AddPropertyDialog />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ajouter un bien</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={handleNotificationsClick}
                >
                  <Bell className="h-5 w-5" />
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
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Connexion
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Inscription
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};