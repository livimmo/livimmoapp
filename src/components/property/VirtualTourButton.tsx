import { View } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VirtualTourButtonProps {
  onClick: () => void;
  className?: string;
}

export const VirtualTourButton = ({ onClick, className }: VirtualTourButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "bg-orange-500 hover:bg-orange-600 text-white",
        "group flex items-center justify-center shadow-lg hover:shadow-xl",
        "hover:scale-105 transform transition-all duration-300",
        "md:gap-2",
        className
      )}
      size="sm"
    >
      <View className="w-4 h-4" />
      <span className="hidden md:inline">Visite Virtuelle</span>
    </Button>
  );
};