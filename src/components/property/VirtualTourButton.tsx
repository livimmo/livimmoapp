import { Button } from "@/components/ui/button";
import { View, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface VirtualTourButtonProps {
  propertyId: number;
  className?: string;
}

export const VirtualTourButton = ({ propertyId, className }: VirtualTourButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="default"
      size="sm"
      className={cn(
        "bg-[#F97316] hover:bg-[#F97316]/90 text-white gap-2",
        className
      )}
      onClick={() => navigate(`/property/${propertyId}`)}
    >
      <View className="w-4 h-4" />
      Visite virtuelle
      <ArrowRight className="w-4 h-4" />
    </Button>
  );
};