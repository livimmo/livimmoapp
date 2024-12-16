import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SocialConnect } from "@/components/profile/SocialConnect";
import { ReservationForm } from "@/components/home/ReservationForm";
import { useAuth } from "@/contexts/AuthContext";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  liveData?: {
    id: number;
    title: string;
    date: Date;
    availableSeats?: number;
  };
  onSuccess?: () => void;
}

export const AuthDialog = ({
  isOpen,
  onClose,
  title = "Rejoignez notre communauté",
  description = "Créez votre compte pour accéder à toutes les fonctionnalités",
  liveData,
  onSuccess,
}: AuthDialogProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    onSuccess?.();
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Inscription</TabsTrigger>
            <TabsTrigger value="login">Connexion</TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="space-y-4">
            {liveData ? (
              <ReservationForm live={liveData} onClose={onClose} />
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
                <div className="space-y-4">
                  <SocialConnect />
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Ou continuez avec email
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.location.href = "/signup"}
                  >
                    Créer un compte avec email
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="login">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Connectez-vous pour accéder à votre compte
              </p>
              <SocialConnect />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.location.href = "/login"}
              >
                Se connecter avec email
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};