import { LiveEvent } from "@/types/live";
import { Card } from "@/components/ui/card";
import { LiveCalendar } from "@/components/home/LiveCalendar";

interface ScheduledLivesSectionProps {
  scheduledLives: LiveEvent[];
}

export const ScheduledLivesSection = ({ scheduledLives }: ScheduledLivesSectionProps) => {
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
                className="p-3 hover:bg-accent rounded-lg transition-colors cursor-pointer group"
              >
                <p className="font-medium group-hover:text-primary transition-colors">
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
              </div>
            ))}
          </Card>
        </div>
      </div>
    </section>
  );
};