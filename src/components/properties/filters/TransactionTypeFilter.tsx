import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TransactionTypeFilterProps {
  transactionType: string;
  setTransactionType: (value: "Vente" | "Location") => void;
}

export const TransactionTypeFilter = ({
  transactionType,
  setTransactionType,
}: TransactionTypeFilterProps) => {
  return (
    <div className="space-y-2">
      <Label>Type de transaction</Label>
      <RadioGroup
        value={transactionType}
        onValueChange={(value) => setTransactionType(value as "Vente" | "Location")}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Vente" id="vente" />
          <Label htmlFor="vente">Vente</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Location" id="location" />
          <Label htmlFor="location">Location</Label>
        </div>
      </RadioGroup>
    </div>
  );
};