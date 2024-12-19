import { useState } from "react";
import { type Property } from "@/types/property";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import { mockProperties } from "@/data/mockProperties";

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
  const properties = mockProperties;

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un bien..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="flex items-start space-x-4 rounded-lg border p-4 hover:bg-accent"
            >
              <Checkbox
                checked={selectedProperties.some((p) => p.id === property.id)}
                onCheckedChange={() => handlePropertyToggle(property)}
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{property.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {property.price.toLocaleString()} DH
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{property.location}</p>
                <div className="flex text-sm text-muted-foreground">
                  <span>{property.surface} m²</span>
                  <span className="mx-2">•</span>
                  <span>{property.rooms} pièces</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}