import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ViewersCounterProps {
  count: number;
}

export const ViewersCounter = ({ count }: ViewersCounterProps) => {
  return (
    <Badge 
      variant="secondary" 
      className="bg-white/90 backdrop-blur-sm text-gray-700 flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium"
    >
      <Users className="w-3.5 h-3.5" />
      {count}
    </Badge>
  );
};