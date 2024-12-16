import { Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  count: number;
  className?: string;
}

export const LiveBadge = ({ count, className }: LiveBadgeProps) => {
  return (
    <div className={cn("relative inline-flex", className)}>
      <Video className="h-4 w-4" />
      {count > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
        >
          {count}
        </Badge>
      )}
    </div>
  );
};