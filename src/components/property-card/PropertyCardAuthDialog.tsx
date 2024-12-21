import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PropertyCardAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PropertyCardAuthDialog = ({
  open,
  onOpenChange,
}: PropertyCardAuthDialogProps) => {
  const navigate = useNavigate();

  const handleAuthAction = (action: 'login' | 'signup') => {
    onOpenChange(false);
    navigate(`/${action}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connectez-vous pour ajouter aux favoris</DialogTitle>
          <DialogDescription>
            Pour ajouter ce bien à vos favoris, vous devez avoir un compte Livimmo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 mt-4">
          <Button variant="outline" className="w-full" onClick={() => handleAuthAction('signup')}>
            Créer un compte
          </Button>
          <Button className="w-full" onClick={() => handleAuthAction('login')}>
            Se connecter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};