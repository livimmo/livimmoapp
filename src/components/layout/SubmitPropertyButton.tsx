import { useState } from "react";
import { HousePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PropertySubmissionForm } from "@/components/property/submission/PropertySubmissionForm";

export const SubmitPropertyButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to submit property
      console.log("Property submission data:", data);
      
      toast({
        title: "Bien soumis avec succès",
        description: "Notre équipe prendra contact avec vous sous 24 heures.",
      });
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Déposer votre bien</DialogTitle>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
            <PropertySubmissionForm 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};