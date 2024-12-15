import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ViewersCounterProps {
  count: number;
}

export const ViewersCounter = ({ count }: ViewersCounterProps) => {
  return (
    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-700 flex items-center gap-1">
      <Users className="w-3 h-3" />
      {count}
    </Badge>
  );
};