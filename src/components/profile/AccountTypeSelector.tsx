import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Building, User } from "lucide-react";

export type AccountType = "buyer" | "agent";

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (value: AccountType) => void;
}

export const AccountTypeSelector = ({ value, onChange }: AccountTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Type de compte</h2>
      <RadioGroup
        value={value}
        onValueChange={onChange}
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
  );
};