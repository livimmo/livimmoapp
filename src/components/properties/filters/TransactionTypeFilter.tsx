import { Button } from "@/components/ui/button";
import { Home, Calendar } from "lucide-react";

interface TransactionTypeFilterProps {
  transactionType: string[];
  setTransactionType: (value: string[]) => void;
}

export const TransactionTypeFilter = ({
  transactionType,
  setTransactionType,
}: TransactionTypeFilterProps) => {
  const handleTypeChange = (type: string) => {
    setTransactionType([type]);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={transactionType.includes("Vente") ? "default" : "outline"}
        onClick={() => handleTypeChange("Vente")}
        size="sm"
        className="w-24"
      >
        <Home className="mr-2 h-4 w-4" />
        Achat
      </Button>
      <Button
        variant={transactionType.includes("Location") ? "default" : "outline"}
        onClick={() => handleTypeChange("Location")}
        size="sm"
        className="w-24"
      >
        <Calendar className="mr-2 h-4 w-4" />
        Location
      </Button>
    </div>
  );
};