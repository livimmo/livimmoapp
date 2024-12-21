import { Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  count: number;
  className?: string;
}

export const LiveBadge = ({ count, className }: LiveBadgeProps) => {
  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <Video className="h-5 w-5 text-white" />
      {count > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-3 -right-3 h-5 w-5 p-0 flex items-center justify-center text-xs font-medium rounded-full"
        >
          {count}
        </Badge>
      )}
    </div>
  );
};