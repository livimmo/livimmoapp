import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountType } from "./AccountTypeSelector";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Instagram, Youtube, MessageCircle, Upload } from "lucide-react";
import { LiveManagement } from "./LiveManagement";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountType: AccountType;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string) => void;
}

const availableTags = [
  { id: "new", label: "Nouveauté" },
  { id: "exclusive", label: "Exclusivité" },
  { id: "hot", label: "Coup de fusil" },
  { id: "reduced", label: "Prix réduit" },
  { id: "urgent", label: "Urgent" },
];

export const PersonalInfo = ({
  firstName,
  lastName,
  email,
  phone,
  accountType,
  onSubmit,
  onChange,
}: PersonalInfoProps) => {
  const { toast } = useToast();

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérification de la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "Le fichier est trop volumineux. Taille maximum : 5MB",
          variant: "destructive",
        });
        return;
      }

      // Vérification du type de fichier
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        toast({
          title: "Erreur",
          description: "Format de fichier non supporté. Utilisez JPG, PNG ou PDF",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Pièce d'identité téléchargée avec succès",
      });
    }
  };

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

      {accountType === "buyer" && (
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold">
            Pièce d'identité
          </h3>
          <div className="space-y-2">
            <Label htmlFor="idDocument">Télécharger votre pièce d'identité</Label>
            <div className="flex items-center gap-4">
              <Input
                id="idDocument"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="hidden"
                onChange={handleIdUpload}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('idDocument')?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Choisir un fichier
              </Button>
              <p className="text-sm text-muted-foreground">
                Formats acceptés : JPG, PNG, PDF (max 5MB)
              </p>
            </div>
          </div>
        </div>
      )}

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

          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold">
              Tags pour vos lives
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {availableTags.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox id={`tag-${tag.id}`} />
                  <Label htmlFor={`tag-${tag.id}`}>{tag.label}</Label>
                </div>
              ))}
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