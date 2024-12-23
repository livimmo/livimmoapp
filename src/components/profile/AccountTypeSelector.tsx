import { type AccountType } from "@/types/user";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (value: AccountType) => void;
}

export const AccountTypeSelector = ({
  value,
  onChange,
}: AccountTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Type de compte</h3>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="user" id="user" />
          <Label htmlFor="user">Utilisateur</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="agent" id="agent" />
          <Label htmlFor="agent">Agent</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="promoter" id="promoter" />
          <Label htmlFor="promoter">Promoteur</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="developer" id="developer" />
          <Label htmlFor="developer">Développeur</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="owner" id="owner" />
          <Label htmlFor="owner">Propriétaire</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="admin" id="admin" />
          <Label htmlFor="admin">Administrateur</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="tenant" id="tenant" />
          <Label htmlFor="tenant">Locataire</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export type { AccountType };