import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Home, UtensilsCrossed, PalmTree } from "lucide-react";

interface Chapter {
  id: number;
  title: string;
  timestamp: string;
  icon: React.ReactNode;
}

interface LiveChaptersProps {
  onChapterClick: (timestamp: string) => void;
  isReplay?: boolean;
}

export const LiveChapters = ({ onChapterClick, isReplay }: LiveChaptersProps) => {
  const [chapters] = useState<Chapter[]>([
    { id: 1, title: "Introduction du bien", timestamp: "00:00", icon: <Home className="h-4 w-4" /> },
    { id: 2, title: "Visite du salon", timestamp: "02:30", icon: <Home className="h-4 w-4" /> },
    { id: 3, title: "Cuisine équipée", timestamp: "05:45", icon: <UtensilsCrossed className="h-4 w-4" /> },
    { id: 4, title: "Jardin et extérieurs", timestamp: "08:20", icon: <PalmTree className="h-4 w-4" /> },
  ]);

  return (
    <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4" />
          <h3 className="font-semibold">Chapitres</h3>
        </div>
        <ScrollArea className="h-[200px]">
          <div className="space-y-2">
            {chapters.map((chapter) => (
              <Button
                key={chapter.id}
                variant="ghost"
                className="w-full justify-start gap-2 text-sm"
                onClick={() => onChapterClick(chapter.timestamp)}
              >
                {chapter.icon}
                <span className="flex-1">{chapter.title}</span>
                <span className="text-xs text-muted-foreground">{chapter.timestamp}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};