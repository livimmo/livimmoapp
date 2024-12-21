import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface TimeRemainingProps {
  endDate: Date;
}

export const TimeRemaining = ({ endDate }: TimeRemainingProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("Expiré");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}j ${hours}h`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
      <Clock className="w-4 h-4 mr-1" />
      {timeLeft}
    </Badge>
  );
};