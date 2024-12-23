import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { PersonalInfo } from "@/components/profile/PersonalInfo";
import { SocialConnect } from "@/components/profile/SocialConnect";
import { Button } from "@/components/ui/button";
import { LogOut, Lock, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RoleSelector } from "@/components/auth/RoleSelector";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isRoleSwitchDialogOpen, setIsRoleSwitchDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user?.role || null);

  const handleRoleSwitch = (newRole: string) => {
    setSelectedRole(newRole);
    setIsRoleSwitchDialogOpen(true);
  };

  const confirmRoleSwitch = () => {
    toast({
      title: "Rôle mis à jour",
      description: "Votre rôle a été changé avec succès.",
    });
    setIsRoleSwitchDialogOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="container px-4 py-8 max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mon Profil</h1>
          <Select defaultValue="fr">
            <SelectTrigger className="w-[140px]">
              <Languages className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-8">
          <ProfileAvatar
            firstName={user?.firstName || ""}
            lastName={user?.lastName || ""}
            avatar={user?.avatar}
          />

          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Changer de Rôle</h2>
            <RoleSelector
              selectedRole={selectedRole}
              onSelect={handleRoleSwitch}
            />
          </div>

          <AlertDialog open={isRoleSwitchDialogOpen} onOpenChange={setIsRoleSwitchDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer le changement de rôle</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir changer votre rôle ? Certaines fonctionnalités seront adaptées à votre nouveau rôle.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSelectedRole(user?.role || null)}>
                  Annuler
                </AlertDialogCancel>
                <AlertDialogAction onClick={confirmRoleSwitch}>
                  Confirmer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full bg-white text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <Lock className="mr-2 h-4 w-4" />
              Changer le mot de passe
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full bg-white text-destructive hover:bg-destructive hover:text-white transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Se déconnecter ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous
                    reconnecter pour accéder à votre compte.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout} className="bg-destructive text-white hover:bg-destructive/90">
                    Se déconnecter
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <PersonalInfo
            firstName={user?.firstName || ""}
            lastName={user?.lastName || ""}
            email={user?.email || ""}
            phone={user?.phone || ""}
          />

          <div className="border-t pt-8">
            <h2 className="text-lg font-semibold mb-4">Connexion sociale</h2>
            <SocialConnect />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;