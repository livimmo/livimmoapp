import { Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { SubmitPropertyButton } from "./SubmitPropertyButton";
import { AuthActions } from "./AuthActions";
import { UserActions } from "./UserActions";
import { AgentActions } from "./AgentActions";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
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

  const isAgentOrPromoter = user?.role === 'agent' || user?.role === 'promoter';
  const isBuyerOrTenant = user?.role === 'buyer' || user?.role === 'tenant';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 h-12 flex items-center justify-between">
        <div 
          className="flex items-center gap-1.5 cursor-pointer" 
          onClick={handleLogoClick}
        >
          <Video className="h-4 w-4 text-[#ea384c] camera-icon" />
          <h1 className="text-lg font-bold text-primary">
            Livimmo
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <SubmitPropertyButton />
          {isAuthenticated ? (
            <>
              {isAgentOrPromoter && <AgentActions />}
              <UserActions isBuyerOrTenant={isBuyerOrTenant} />
            </>
          ) : (
            <AuthActions />
          )}
        </div>
      </div>
    </header>
  );
};