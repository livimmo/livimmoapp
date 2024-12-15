import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { BottomNav } from "@/components/BottomNav";
import { Building, Camera, User } from "lucide-react";
import { useState } from "react";

type AccountType = "buyer" | "agent";

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
          {/* Photo de profil */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>
                {profile.firstName[0]}
                {profile.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <Camera className="mr-2 h-4 w-4" />
              Modifier la photo
            </Button>
          </div>

          {/* Type de compte */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Type de compte</h2>
            <RadioGroup
              value={profile.accountType}
              onValueChange={handleAccountTypeChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="buyer" id="buyer" />
                <Label
                  htmlFor="buyer"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <User className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Acheteur/Locataire</p>
                    <p className="text-sm text-muted-foreground">
                      Recherchez des biens et participez aux lives
                    </p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="agent" id="agent" />
                <Label
                  htmlFor="agent"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Building className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Agent/Promoteur</p>
                    <p className="text-sm text-muted-foreground">
                      Publiez des biens et organisez des lives
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Informations personnelles */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-lg font-semibold">Informations personnelles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {profile.accountType === "agent" && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold">
                  Informations professionnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Nom de l'entreprise</Label>
                    <Input id="company" placeholder="Votre entreprise" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">Numéro de licence</Label>
                    <Input id="license" placeholder="XXX-XXX-XXX" />
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full">
              Enregistrer les modifications
            </Button>
          </form>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;