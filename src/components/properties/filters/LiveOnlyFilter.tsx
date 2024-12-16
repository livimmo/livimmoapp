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
      <Label htmlFor="live" className="flex items-center gap-2">
        Live uniquement
        <div className="flex gap-2 items-center text-sm">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          </span>
        </div>
      </Label>
    </div>
  );
};