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
        "bg-orange-500 hover:bg-orange-600 text-white gap-2",
        "group flex items-center shadow-lg hover:shadow-xl",
        "hover:scale-105 transform transition-all duration-300",
        className
      )}
    >
      <View className="w-4 h-4" />
      Visite Virtuelle
    </Button>
  );
};