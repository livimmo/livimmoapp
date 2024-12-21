import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user";
import { Textarea } from "@/components/ui/textarea";

interface RoleSpecificStepProps {
  role: UserRole;
  formData: any;
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const RoleSpecificStep = ({
  role,
  formData,
  onChange,
  onNext,
  onBack,
}: RoleSpecificStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const renderFields = () => {
    switch (role) {
      case "owner":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone*</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Adresse principale*</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => onChange("location", e.target.value)}
                placeholder="Ville, Quartier"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Présentation</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => onChange("description", e.target.value)}
                placeholder="Présentez-vous en quelques mots..."
                className="h-32"
              />
            </div>
          </>
        );
      case "promoter":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName">Nom de l'entreprise</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => onChange("companyName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sector">Secteur d'activité</Label>
              <Input
                id="sector"
                value={formData.sector}
                onChange={(e) => onChange("sector", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone professionnel</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                required
              />
            </div>
          </>
        );
      case "agent":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="agency">Agence affiliée (optionnel)</Label>
              <Input
                id="agency"
                value={formData.agency}
                onChange={(e) => onChange("agency", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localisation principale</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => onChange("location", e.target.value)}
                required
              />
            </div>
          </>
        );
      case "tenant":
      case "buyer":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="propertyType">Type de bien recherché</Label>
              <Input
                id="propertyType"
                value={formData.propertyType}
                onChange={(e) => onChange("propertyType", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget maximum</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => onChange("budget", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desiredLocation">Localisation souhaitée</Label>
              <Input
                id="desiredLocation"
                value={formData.desiredLocation}
                onChange={(e) => onChange("desiredLocation", e.target.value)}
              />
            </div>
          </>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderFields()}
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Retour
        </Button>
        <Button type="submit" className="flex-1">
          Continuer
        </Button>
      </div>
    </form>
  );
};
