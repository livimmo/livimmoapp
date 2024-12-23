import { useState } from "react";
import { Plus, Home, Building2, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAgent = user?.role === "agent";
  const isPromoter = user?.role === "promoter";
  const isOwner = user?.role === "owner";
  const showButton = isAgent || isOwner || isPromoter;

  if (!showButton) {
    return null;
  }

  const getButtonText = () => {
    if (isOwner) return "Déposer mon Bien";
    if (isAgent) return "Ajouter un Bien";
    if (isPromoter) return "Déposer un Projet";
    return "Déposer un Bien";
  };

  const getButtonIcon = () => {
    if (isOwner) return Home;
    if (isAgent) return Building2;
    if (isPromoter) return Building;
    return Plus;
  };

  const getDialogTitle = () => {
    if (isOwner) return "Déposer mon bien";
    if (isAgent) return "Ajouter un bien";
    if (isPromoter) return "Déposer un projet";
    return "Déposer un bien";
  };

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
      
      const successMessage = isOwner 
        ? "Notre équipe prendra contact avec vous sous 24 heures."
        : "Votre bien a été publié avec succès.";

      toast({
        title: "Bien soumis avec succès",
        description: successMessage,
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

  if (isMobile) {
    return null; // Le bouton est géré par la BottomNav sur mobile
  }

  const Icon = getButtonIcon();

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outline"
        size="sm"
        className="hidden md:flex items-center gap-2"
      >
        <Icon className="h-4 w-4" />
        {getButtonText()}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
            <PropertySubmissionForm 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting}
              userRole={user?.role}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};