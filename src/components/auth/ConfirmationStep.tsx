import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConfirmationStepProps {
  role: UserRole;
  onConfirm: () => void;
  onBack: () => void;
}

export const ConfirmationStep = ({
  role,
  onConfirm,
  onBack,
}: ConfirmationStepProps) => {
  const navigate = useNavigate();

  const getRoleMessage = () => {
    switch (role) {
      case "owner":
        return "Bienvenue ! Vous pouvez maintenant ajouter et gérer vos biens immobiliers.";
      case "promoter":
        return "Bienvenue ! Vous pouvez maintenant ajouter vos projets et programmer vos lives.";
      case "agent":
        return "Bienvenue ! Vous pouvez maintenant gérer vos biens et interagir avec vos clients.";
      case "tenant":
        return "Bienvenue ! Commencez à explorer les locations disponibles.";
      case "buyer":
        return "Bienvenue ! Découvrez les biens à vendre et participez aux lives.";
      default:
        return "Bienvenue sur Livimmo !";
    }
  };

  const handleConfirm = async () => {
    await onConfirm();
    navigate('/');
  };

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Compte créé avec succès !</h3>
        <p className="text-muted-foreground">{getRoleMessage()}</p>
      </div>
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Retour
        </Button>
        <Button onClick={handleConfirm} className="flex-1">
          Commencer
        </Button>
      </div>
    </div>
  );
};
