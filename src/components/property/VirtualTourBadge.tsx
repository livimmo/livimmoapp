import { View } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const VirtualTourBadge = () => {
  return (
    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm flex items-center gap-1 font-semibold shadow-sm">
      <View className="w-3 h-3" />
      360°
    </Badge>
  );
};