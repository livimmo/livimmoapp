import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TransactionTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const TransactionTypeFilter = ({ value, onChange }: TransactionTypeFilterProps) => {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(value) => {
        if (value) onChange(value);
      }}
      className="justify-start"
    >
      <ToggleGroupItem value="buy" aria-label="Toggle buy">
        🏠 Achat
      </ToggleGroupItem>
      <ToggleGroupItem value="rent" aria-label="Toggle rent">
        📅 Location
      </ToggleGroupItem>
    </ToggleGroup>
  );
};