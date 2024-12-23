import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export const LiveSearchFilters = () => {
  const [liveType, setLiveType] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [propertyStatus, setPropertyStatus] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  return (
    <Card className="p-4 space-y-6">
      <div className="space-y-2">
        <Label>Type de Live</Label>
        <RadioGroup
          defaultValue={liveType}
          onValueChange={setLiveType}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all-lives" />
            <Label htmlFor="all-lives">Tous</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="live" id="live" />
            <Label htmlFor="live">En direct</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="scheduled" id="scheduled" />
            <Label htmlFor="scheduled">Programmé</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="replay" id="replay" />
            <Label htmlFor="replay">Replay</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Type de Bien</Label>
        <RadioGroup
          defaultValue={propertyType}
          onValueChange={setPropertyType}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all-properties" />
            <Label htmlFor="all-properties">Tous</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="residential" id="residential" />
            <Label htmlFor="residential">Résidentiel</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="commercial" id="commercial" />
            <Label htmlFor="commercial">Commercial</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="land" id="land" />
            <Label htmlFor="land">Terrain</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Statut du Bien</Label>
        <RadioGroup
          defaultValue={propertyStatus}
          onValueChange={setPropertyStatus}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all-status" />
            <Label htmlFor="all-status">Tous</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="available" id="available" />
            <Label htmlFor="available">Disponible</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pending" id="pending" />
            <Label htmlFor="pending">En cours</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sold" id="sold" />
            <Label htmlFor="sold">Vendu</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Plage de Prix (MAD)</Label>
        <Slider
          defaultValue={priceRange}
          max={10000000}
          step={100000}
          onValueChange={setPriceRange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{priceRange[0].toLocaleString()} MAD</span>
          <span>{priceRange[1].toLocaleString()} MAD</span>
        </div>
      </div>

      <Button className="w-full">Appliquer les filtres</Button>
    </Card>
  );
};