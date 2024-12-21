import { HousePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const SubmitPropertyButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour déposer votre bien",
      });
      navigate("/login");
      return;
    }
    navigate("/submit-property");
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="sm"
      className="hidden md:flex items-center gap-2"
    >
      <HousePlus className="h-4 w-4" />
      Déposer Votre Bien
    </Button>
  );
};