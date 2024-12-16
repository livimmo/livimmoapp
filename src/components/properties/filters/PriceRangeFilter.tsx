import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface PriceRangeFilterProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
}

export const PriceRangeFilter = ({
  priceRange,
  setPriceRange,
}: PriceRangeFilterProps) => {
  const [manualPrice, setManualPrice] = useState(false);

  const handlePriceChange = (value: number[]) => {
    if (value[1] >= 10000000) {
      setManualPrice(true);
    }
    setPriceRange(value);
  };

  const handleManualPriceChange = (index: number, value: string) => {
    const newValue = parseInt(value) || 0;
    const newRange = [...priceRange];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Prix (DH)</Label>
      {manualPrice ? (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handleManualPriceChange(0, e.target.value)}
            className="w-32"
            placeholder="Min"
          />
          <span>-</span>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handleManualPriceChange(1, e.target.value)}
            className="w-32"
            placeholder="Max"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setManualPrice(false)}
          >
            Utiliser le curseur
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0].toLocaleString()} DH</span>
            <span>{priceRange[1].toLocaleString()} DH</span>
          </div>
          <Slider
            min={0}
            max={10000000}
            step={100000}
            value={priceRange}
            onValueChange={handlePriceChange}
          />
        </div>
      )}
    </div>
  );
};