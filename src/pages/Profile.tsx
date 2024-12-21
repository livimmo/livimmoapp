import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { AccountTypeSelector, AccountType } from "@/components/profile/AccountTypeSelector";
import { PersonalInfo } from "@/components/profile/PersonalInfo";
import { SocialConnect } from "@/components/profile/SocialConnect";
import { PropertyManagementSection } from "@/components/profile/PropertyManagementSection";

import { Button } from "@/components/ui/button";
import { LogOut, Lock, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountType: AccountType;
  avatar?: string;
  isVerified: boolean;
  language: string;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+212 6XX XXX XXX",
    accountType: "buyer",
    isVerified: false,
    language: "fr",
  });

  const handleAccountTypeChange = (value: AccountType) => {
    setProfile((prev) => ({ ...prev, accountType: value }));
    toast({
      title: "Type de compte mis à jour",
      description: `Vous êtes maintenant enregistré en tant que ${
        value === "buyer" ? "acheteur/locataire" : "agent/promoteur"
      }.`,
    });
  };

  const handleLanguageChange = (value: string) => {
    setProfile((prev) => ({ ...prev, language: value }));
    toast({
      title: "Langue mise à jour",
      description: "La langue de l'interface a été modifiée avec succès.",
    });
  };

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate('/');
  };

  const handlePasswordChange = () => {
    toast({
      title: "Changement de mot de passe",
      description: "Un email vous a été envoyé pour changer votre mot de passe.",
    });
  };

  const isAgent = profile.accountType === "agent";

  return (
    <div className="min-h-screen pb-20">
      <div className="container px-4 py-8 max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mon Profil</h1>
          <Select value={profile.language} onValueChange={handleLanguageChange}>
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
            firstName={profile.firstName}
            lastName={profile.lastName}
            avatar={profile.avatar}
            accountType={profile.accountType}
          />

          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full bg-white text-primary hover:bg-primary hover:text-white transition-colors"
              onClick={handlePasswordChange}
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

          <AccountTypeSelector
            value={profile.accountType}
            onChange={handleAccountTypeChange}
          />

          <PersonalInfo
            {...profile}
            onSubmit={handleSubmit}
            onChange={handleProfileChange}
          />

          {isAgent && user?.id && (
            <PropertyManagementSection userId={user.id} />
          )}

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
