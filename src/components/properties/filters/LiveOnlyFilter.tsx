import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LiveBadge } from "@/components/live/LiveBadge";
import { Play, History, Calendar, Video } from "lucide-react";

interface LiveOnlyFilterProps {
  viewType: "all" | "live" | "scheduled" | "virtual" | "replay";
  setViewType: (value: "all" | "live" | "scheduled" | "virtual" | "replay") => void;
}

export const LiveOnlyFilter = ({
  viewType,
  setViewType,
}: LiveOnlyFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={viewType} onValueChange={setViewType}>
        <SelectTrigger className="w-[200px] bg-white">
          <SelectValue placeholder="Type de visite" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="flex items-center gap-2">
            Tous les types
          </SelectItem>
          <SelectItem value="live" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-red-500" />
              Lives en cours
            </div>
          </SelectItem>
          <SelectItem value="scheduled" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              Lives programmés
            </div>
          </SelectItem>
          <SelectItem value="virtual" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-purple-500" />
              Visites virtuelles
            </div>
          </SelectItem>
          <SelectItem value="replay" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-emerald-500" />
              Replays
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};