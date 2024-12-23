import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountType } from "./AccountTypeSelector";
import { RoleSwitcher } from "./RoleSwitcher";

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountType: AccountType;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string) => void;
}

export const PersonalInfo = ({
  firstName,
  lastName,
  email,
  phone,
  onSubmit,
  onChange,
}: PersonalInfoProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-lg font-semibold">Informations personnelles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
      </div>

      <RoleSwitcher />

      <Button type="submit">
        Enregistrer les modifications
      </Button>
    </form>
  );
};