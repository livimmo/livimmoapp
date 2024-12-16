import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountType } from "./AccountTypeSelector";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { LiveManagement } from "./LiveManagement";

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
        <>
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

          <div className="space-y-4 border-t pt-4">
            <LiveManagement />
          </div>

          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold">
              Plateformes de Live préférées
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="youtube" />
                <Label htmlFor="youtube" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  YouTube Live
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="facebook" />
                <Label htmlFor="facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook Live
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="instagram" />
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram Live
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="whatsapp" />
                <Label htmlFor="whatsapp" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Video
                </Label>
              </div>
            </div>
          </div>
        </>
      )}

      <Button type="submit" className="w-full">
        Enregistrer les modifications
      </Button>
    </form>
  );
};