export type AccountType = "owner" | "buyer" | "agent" | "promoter" | "developer" | "admin";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (value: AccountType) => void;
}

export const AccountTypeSelector = ({ value, onChange }: AccountTypeSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sélectionner un type de compte" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="owner">Propriétaire</SelectItem>
        <SelectItem value="buyer">Acheteur</SelectItem>
        <SelectItem value="agent">Agent</SelectItem>
        <SelectItem value="promoter">Promoteur</SelectItem>
        <SelectItem value="developer">Développeur</SelectItem>
        <SelectItem value="admin">Administrateur</SelectItem>
      </SelectContent>
    </Select>
  );
};
