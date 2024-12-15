import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LiveRegistrationStatusProps {
  isRegistered: boolean;
  liveDate: Date;
}

export const LiveRegistrationStatus = ({ isRegistered, liveDate }: LiveRegistrationStatusProps) => {
  if (!isRegistered) return null;

  return (
    <Badge className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white">
      <Check className="w-4 h-4 mr-1" />
      Inscrit
    </Badge>
  );
};