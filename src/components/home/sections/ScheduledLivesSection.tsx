import { LiveEvent } from "@/types/live";
import { Card } from "@/components/ui/card";
import { LiveCalendar } from "@/components/home/LiveCalendar";
import { Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface ScheduledLivesSectionProps {
  scheduledLives: LiveEvent[];
}

export const ScheduledLivesSection = ({ scheduledLives }: ScheduledLivesSectionProps) => {
  const [countdowns, setCountdowns] = useState<{ [key: number]: string }>({});

  const calculateTimeLeft = (date: Date) => {
    const difference = new Date(date).getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return "En direct";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}j ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns: { [key: number]: string } = {};
      scheduledLives.forEach((live) => {
        newCountdowns[live.id] = calculateTimeLeft(live.date);
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [scheduledLives]);

  return (
    <section className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Lives programmés</h2>
          <p className="text-muted-foreground mt-1">
            Réservez votre place pour les prochaines visites
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <LiveCalendar defaultDate={new Date()} />
        </div>
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Prochains lives</h3>
            {scheduledLives.slice(0, 3).map((live) => (
              <div 
                key={live.id} 
                className="p-3 hover:bg-accent rounded-lg transition-colors cursor-pointer group flex items-center gap-3"
              >
                <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={live.thumbnail} 
                    alt={live.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-1 left-1 right-1 flex items-center justify-center bg-black/60 rounded text-[10px] text-white py-0.5">
                    <Clock className="w-3 h-3 mr-1" />
                    {countdowns[live.id]}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium group-hover:text-primary transition-colors truncate">
                    {live.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(live.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    {live.location} {live.neighborhood && `- ${live.neighborhood}`}
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </section>
  );
};