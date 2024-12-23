import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertyTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const PropertyTypeFilter = ({ value, onChange }: PropertyTypeFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Type de bien" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tous les types</SelectItem>
        <SelectItem value="Villa">Villa</SelectItem>
        <SelectItem value="Appartement">Appartement</SelectItem>
        <SelectItem value="Bureau">Bureau</SelectItem>
        <SelectItem value="Riad">Riad</SelectItem>
        <SelectItem value="Hôtel">Hôtel</SelectItem>
        <SelectItem value="Commerce">Commerce</SelectItem>
        <SelectItem value="Industriel">Industriel</SelectItem>
        <SelectItem value="Terrain">Terrain</SelectItem>
      </SelectContent>
    </Select>
  );
};