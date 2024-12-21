import { HousePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export const SubmitPropertyButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Si l'utilisateur est un agent ou un promoteur, on ne montre pas le bouton
  if (user?.role === "agent" || user?.role === "promoter") {
    return null;
  }

  const handleClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour déposer votre bien",
      });
      navigate("/login");
      return;
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    setIsDialogOpen(false);
    navigate("/submit-property");
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outline"
        size="sm"
        className="hidden md:flex items-center gap-2"
      >
        <HousePlus className="h-4 w-4" />
        Déposer Votre Bien
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Déposer votre bien</DialogTitle>
            <DialogDescription className="pt-4">
              Vous êtes sur le point de déposer une annonce pour votre bien immobilier.
              Notre équipe vous accompagnera tout au long du processus.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-sm">
              <h3 className="font-medium mb-2">Ce que vous pouvez faire :</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ajouter des photos et vidéos de votre bien</li>
                <li>Décrire en détail votre propriété</li>
                <li>Programmer des visites en direct</li>
                <li>Gérer vos demandes de visite</li>
              </ul>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSubmit}>
                Continuer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};