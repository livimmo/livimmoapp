import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface SurfaceRangeFilterProps {
  surfaceRange: number[];
  setSurfaceRange: (value: number[]) => void;
}

export const SurfaceRangeFilter = ({
  surfaceRange,
  setSurfaceRange,
}: SurfaceRangeFilterProps) => {
  const [manualSurface, setManualSurface] = useState(false);

  const handleSurfaceChange = (value: number[]) => {
    if (value[1] >= 10000) {
      setManualSurface(true);
    }
    setSurfaceRange(value);
  };

  const handleManualSurfaceChange = (index: number, value: string) => {
    const newValue = parseInt(value) || 0;
    const newRange = [...surfaceRange];
    newRange[index] = newValue;
    setSurfaceRange(newRange);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Surface (m²)</Label>
      {manualSurface ? (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={surfaceRange[0]}
            onChange={(e) => handleManualSurfaceChange(0, e.target.value)}
            className="w-32"
            placeholder="Min"
          />
          <span>-</span>
          <Input
            type="number"
            value={surfaceRange[1]}
            onChange={(e) => handleManualSurfaceChange(1, e.target.value)}
            className="w-32"
            placeholder="Max"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setManualSurface(false)}
          >
            Utiliser le curseur
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{surfaceRange[0]} m²</span>
            <span>{surfaceRange[1]} m²</span>
          </div>
          <Slider
            min={0}
            max={10000}
            step={10}
            value={surfaceRange}
            onValueChange={handleSurfaceChange}
          />
        </div>
      )}
    </div>
  );
};