import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { AccountTypeSelector, AccountType } from "@/components/profile/AccountTypeSelector";
import { PersonalInfo } from "@/components/profile/PersonalInfo";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountType: AccountType;
  avatar?: string;
}

const Profile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+212 6XX XXX XXX",
    accountType: "buyer",
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

  return (
    <div className="min-h-screen pb-20">
      <div className="container px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Mon Profil</h1>

        <div className="space-y-8">
          <ProfileAvatar
            firstName={profile.firstName}
            lastName={profile.lastName}
            avatar={profile.avatar}
          />

          <AccountTypeSelector
            value={profile.accountType}
            onChange={handleAccountTypeChange}
          />

          <PersonalInfo
            {...profile}
            onSubmit={handleSubmit}
            onChange={handleProfileChange}
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;