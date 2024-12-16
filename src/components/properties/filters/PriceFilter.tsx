import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface PriceFilterProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  manualPrice: boolean;
  setManualPrice: (value: boolean) => void;
  handleManualPriceChange: (index: number, value: string) => void;
}

export const PriceFilter = ({
  priceRange,
  setPriceRange,
  manualPrice,
  setManualPrice,
  handleManualPriceChange,
}: PriceFilterProps) => {
  const handlePriceChange = (value: number[]) => {
    if (value[1] >= 10000000) {
      setManualPrice(true);
    }
    setPriceRange(value);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Prix (DH)</label>
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