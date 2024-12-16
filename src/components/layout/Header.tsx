import { Video, Bell, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <h1 
            className="text-lg font-bold text-primary cursor-pointer" 
            onClick={() => navigate('/')}
          >
            Livimmo
          </h1>
          <Video className="h-4 w-4 text-[#ea384c]" />
        </div>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/notifications')}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  3
                </span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/profile')}
              >
                <User className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button 
              variant="default"
              size="sm"
              onClick={() => navigate('/login')}
              className="flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Connexion
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};