import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface ViewersCounterProps {
  count: number;
}

export const ViewersCounter = ({ count: initialCount }: ViewersCounterProps) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // Simuler des changements dynamiques du nombre de spectateurs
    const interval = setInterval(() => {
      setCount((prevCount) => {
        // Ajouter ou soustraire aléatoirement 1 spectateur
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(0, prevCount + change);
      });
    }, 5000); // Mettre à jour toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-700 flex items-center gap-1">
      <Users className="w-3 h-3" />
      {count} spectateurs
    </Badge>
  );
};