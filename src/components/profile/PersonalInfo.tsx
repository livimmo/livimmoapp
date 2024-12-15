import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountType } from "./AccountTypeSelector";

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
  accountType,
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

      {accountType === "agent" && (
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
  );
};