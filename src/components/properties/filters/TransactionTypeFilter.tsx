import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface TransactionTypeFilterProps {
  transactionType: string[];
  setTransactionType: (value: string[]) => void;
}

export const TransactionTypeFilter = ({
  transactionType,
  setTransactionType,
}: TransactionTypeFilterProps) => {
  const handleCheckboxChange = (type: string, checked: boolean) => {
    if (checked) {
      setTransactionType([...transactionType, type]);
    } else {
      setTransactionType(transactionType.filter(t => t !== type));
    }
  };

  return (
    <div className="space-y-2">
      <Label>Type de transaction</Label>
      <div className="flex gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="vente"
            checked={transactionType.includes("Vente")}
            onCheckedChange={(checked) => handleCheckboxChange("Vente", checked as boolean)}
          />
          <Label htmlFor="vente">Vente</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="location"
            checked={transactionType.includes("Location")}
            onCheckedChange={(checked) => handleCheckboxChange("Location", checked as boolean)}
          />
          <Label htmlFor="location">Location</Label>
        </div>
      </div>
    </div>
  );
};