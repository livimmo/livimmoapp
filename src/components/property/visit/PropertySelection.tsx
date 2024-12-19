import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import { type Property } from "@/types/property";

interface PropertySelectionProps {
  selectedProperties: Property[];
  setSelectedProperties: (properties: Property[]) => void;
  initialProperty?: Property;
}

export function PropertySelection({
  selectedProperties,
  setSelectedProperties,
  initialProperty,
}: PropertySelectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [availableProperties] = useState<Property[]>(
    initialProperty ? [initialProperty] : []
  );

  const filteredProperties = availableProperties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePropertyToggle = (property: Property) => {
    const isSelected = selectedProperties.some((p) => p.id === property.id);
    if (isSelected) {
      setSelectedProperties(selectedProperties.filter((p) => p.id !== property.id));
    } else {
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un bien..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div key={property.id} className="flex items-start space-x-4">
              <Checkbox
                id={`property-${property.id}`}
                checked={selectedProperties.some((p) => p.id === property.id)}
                onCheckedChange={() => handlePropertyToggle(property)}
              />
              <div className="grid gap-1.5">
                <label
                  htmlFor={`property-${property.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {property.title}
                </label>
                <p className="text-sm text-muted-foreground">
                  {property.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}