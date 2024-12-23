import { type AccountType } from "@/types/user";
import { RadioGroup } from "@/components/ui/radio-group";

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
        <RadioGroup.Item value="user" className="flex items-center">
          <RadioGroup.Indicator className="h-4 w-4 border rounded-full" />
          <span className="ml-2">Utilisateur</span>
        </RadioGroup.Item>
        <RadioGroup.Item value="agent" className="flex items-center">
          <RadioGroup.Indicator className="h-4 w-4 border rounded-full" />
          <span className="ml-2">Agent</span>
        </RadioGroup.Item>
        <RadioGroup.Item value="promoter" className="flex items-center">
          <RadioGroup.Indicator className="h-4 w-4 border rounded-full" />
          <span className="ml-2">Promoteur</span>
        </RadioGroup.Item>
        <RadioGroup.Item value="developer" className="flex items-center">
          <RadioGroup.Indicator className="h-4 w-4 border rounded-full" />
          <span className="ml-2">Développeur</span>
        </RadioGroup.Item>
        <RadioGroup.Item value="owner" className="flex items-center">
          <RadioGroup.Indicator className="h-4 w-4 border rounded-full" />
          <span className="ml-2">Propriétaire</span>
        </RadioGroup.Item>
        <RadioGroup.Item value="admin" className="flex items-center">
          <RadioGroup.Indicator className="h-4 w-4 border rounded-full" />
          <span className="ml-2">Administrateur</span>
        </RadioGroup.Item>
        <RadioGroup.Item value="tenant" className="flex items-center">
          <RadioGroup.Indicator className="h-4 w-4 border rounded-full" />
          <span className="ml-2">Locataire</span>
        </RadioGroup.Item>
      </RadioGroup>
    </div>
  );
};
