import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LiveOnlyFilterProps {
  showLiveOnly: boolean;
  setShowLiveOnly: (value: boolean) => void;
  viewType: "all" | "live" | "replay";
  setViewType: (value: "all" | "live" | "replay") => void;
}

export const LiveOnlyFilter = ({
  viewType,
  setViewType,
}: LiveOnlyFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={viewType} onValueChange={setViewType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type de visionnage" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les biens</SelectItem>
          <SelectItem value="live">Lives uniquement</SelectItem>
          <SelectItem value="replay">Replays uniquement</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};