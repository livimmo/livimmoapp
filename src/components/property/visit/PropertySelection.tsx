import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { mockProperties } from "@/data/mockProperties";

interface PropertySelectionProps {
  selectedProperties: Property[];
  onPropertySelect: (properties: Property[]) => void;
  initialProperty?: Property;
  onNext: () => void;
  canProceed: boolean;
}

export const PropertySelection = ({
  selectedProperties,
  onPropertySelect,
  initialProperty,
  onNext,
  canProceed,
}: PropertySelectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = mockProperties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProperty = (property: Property) => {
    const isSelected = selectedProperties.some((p) => p.id === property.id);
    if (isSelected) {
      onPropertySelect(selectedProperties.filter((p) => p.id !== property.id));
    } else {
      onPropertySelect([...selectedProperties, property]);
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

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => toggleProperty(property)}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={selectedProperties.some((p) => p.id === property.id)}
                  onCheckedChange={() => toggleProperty(property)}
                />
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-medium">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {property.location}
                  </p>
                  <p className="text-sm font-medium">
                    {property.price.toLocaleString()} DH
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="flex justify-end pt-4">
        <Button onClick={onNext} disabled={!canProceed}>
          Suivant
        </Button>
      </div>
    </div>
  );
};