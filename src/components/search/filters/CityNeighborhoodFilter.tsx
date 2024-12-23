import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CityNeighborhoodFilterProps {
  city: string;
  neighborhood: string;
  setCity: (value: string) => void;
  setNeighborhood: (value: string) => void;
}

const neighborhoods = {
  Casablanca: ["Maarif", "Anfa", "Bourgogne", "Gauthier", "Ain Diab"],
  Rabat: ["Agdal", "Hassan", "Les Orangers", "Hay Riad"],
  Marrakech: ["Guéliz", "Hivernage", "Palmeraie", "Médina"],
};

export const CityNeighborhoodFilter = ({
  city,
  neighborhood,
  setCity,
  setNeighborhood,
}: CityNeighborhoodFilterProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select value={city} onValueChange={setCity}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Ville" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les villes</SelectItem>
          <SelectItem value="Casablanca">Casablanca</SelectItem>
          <SelectItem value="Rabat">Rabat</SelectItem>
          <SelectItem value="Marrakech">Marrakech</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={neighborhood} 
        onValueChange={setNeighborhood}
        disabled={!city || city === "all"}
      >
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Quartier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les quartiers</SelectItem>
          {city && city !== "all" && neighborhoods[city as keyof typeof neighborhoods]?.map((n) => (
            <SelectItem key={n} value={n}>{n}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};