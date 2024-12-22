import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AuthButtons = () => {
  const navigate = useNavigate();

  return (
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
  );
};