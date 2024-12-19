import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Clock, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Visit {
  id: string;
  propertyId: number;
  propertyTitle: string;
  date: Date;
  status: "pending" | "confirmed" | "in_progress" | "completed";
  isLive?: boolean;
  liveUrl?: string;
}

export const useVisitNotifications = (visits: Visit[]) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier les visites à venir et en cours
    const checkVisits = () => {
      const now = new Date();

      visits.forEach((visit) => {
        const visitDate = new Date(visit.date);
        const timeDiff = visitDate.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        // Notification 24h avant
        if (hoursDiff <= 24 && hoursDiff > 23) {
          toast({
            title: "Rappel de visite privée",
            description: `Votre visite pour "${visit.propertyTitle}" est prévue demain à ${format(
              visitDate,
              "HH'h'mm",
              { locale: fr }
            )}`,
            icon: <Calendar className="h-4 w-4" />,
          });
        }

        // Notification 1h avant
        if (hoursDiff <= 1 && hoursDiff > 0.9) {
          toast({
            title: "Visite privée imminente",
            description: `Votre visite pour "${visit.propertyTitle}" commence dans 1 heure`,
            icon: <Clock className="h-4 w-4" />,
            action: visit.isLive ? {
              label: "Rejoindre le live",
              onClick: () => visit.liveUrl && window.open(visit.liveUrl, "_blank"),
            } : undefined,
          });
        }

        // Notification 5min avant
        if (hoursDiff <= 0.083 && hoursDiff > 0) {
          toast({
            title: "Visite privée dans 5 minutes",
            description: `Préparez-vous pour la visite de "${visit.propertyTitle}"`,
            icon: <Home className="h-4 w-4" />,
            action: visit.isLive ? {
              label: "Rejoindre le live",
              onClick: () => visit.liveUrl && window.open(visit.liveUrl, "_blank"),
            } : undefined,
          });
        }

        // Notification début de visite
        if (
          visit.status === "in_progress" &&
          Math.abs(hoursDiff) < 0.083 // Dans les 5 minutes après le début
        ) {
          toast({
            title: "Visite privée en cours",
            description: `Votre visite pour "${visit.propertyTitle}" a commencé`,
            icon: <Home className="h-4 w-4" />,
            action: visit.isLive ? {
              label: "Rejoindre le live",
              onClick: () => visit.liveUrl && window.open(visit.liveUrl, "_blank"),
            } : {
              label: "Voir les détails",
              onClick: () => navigate(`/property/${visit.propertyId}`),
            },
          });
        }
      });
    };

    // Vérifier toutes les minutes
    const interval = setInterval(checkVisits, 60000);
    checkVisits(); // Vérifier immédiatement au montage

    return () => clearInterval(interval);
  }, [visits, toast, navigate]);
};

// Composant pour intégrer les notifications dans l'application
export const VisitNotifications = ({ visits }: { visits: Visit[] }) => {
  useVisitNotifications(visits);
  return null;
};