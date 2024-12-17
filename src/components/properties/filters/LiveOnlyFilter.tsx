import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface LiveOnlyFilterProps {
  showLiveOnly: boolean;
  setShowLiveOnly: (value: boolean) => void;
}

export const LiveOnlyFilter = ({
  showLiveOnly,
  setShowLiveOnly,
}: LiveOnlyFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <Switch
        id="live"
        checked={showLiveOnly}
        onCheckedChange={(checked) => setShowLiveOnly(checked as boolean)}
      />
      <Label htmlFor="live">
        Live uniquement
      </Label>
    </div>
  );
};