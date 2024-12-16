import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const TransactionTypeFilter = ({ value, onChange }: TransactionTypeFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Type de transaction" />
      </SelectTrigger>
      <SelectContent className="bg-white border shadow-lg">
        <SelectItem value="all">Tous les types</SelectItem>
        <SelectItem value="sale">Achat</SelectItem>
        <SelectItem value="rent">Location</SelectItem>
      </SelectContent>
    </Select>
  );
};