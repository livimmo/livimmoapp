import { View } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface VirtualTourButtonProps {
  onClick: () => void;
  className?: string;
}

export const VirtualTourButton = ({ onClick, className }: VirtualTourButtonProps) => {
  const { isAuthenticated } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }
    onClick();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className={cn(
          "bg-orange-500 hover:bg-orange-600 text-white",
          "group flex items-center justify-center shadow-lg hover:shadow-xl",
          "hover:scale-105 transform transition-all duration-300",
          "md:gap-2",
          className
        )}
        size="sm"
      >
        <View className="w-4 h-4" />
        <span className="hidden md:inline">Visite Virtuelle</span>
      </Button>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[425px] animate-in fade-in-0 zoom-in-95">
          <DialogHeader>
            <DialogTitle>Connexion requise</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Pour accéder à la visite virtuelle, vous devez avoir un compte Livimmo.</p>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="w-full hover:scale-105 transition-transform"
                onClick={() => navigate("/signup")}
              >
                Créer un compte
              </Button>
              <Button 
                className="w-full hover:scale-105 transition-transform"
                onClick={() => navigate("/login")}
              >
                Se connecter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};