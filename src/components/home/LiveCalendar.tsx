import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Video, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReservationForm } from "./ReservationForm";

interface LiveEvent {
  id: number;
  title: string;
  date: Date;
  type: string;
  location: string;
  agent: string;
  availableSeats: number;
  thumbnail: string;
  price: string;
}

export const LiveCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedLive, setSelectedLive] = useState<LiveEvent | null>(null);

  // Mock data for scheduled lives
  const scheduledLives: LiveEvent[] = [
    {
      id: 1,
      title: "Villa Moderne avec Piscine",
      date: new Date(Date.now() + 86400000),
      type: "Villa",
      location: "Marrakech",
      agent: "Sarah Martin",
      availableSeats: 15,
      thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      price: "2,500,000 MAD"
    },
    // ... Add more mock data
  ];

  const livesForSelectedDate = scheduledLives.filter(
    live => live.date.toDateString() === selectedDate?.toDateString()
  );

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-lg border"
      />

      <div className="space-y-4">
        {livesForSelectedDate.map((live) => (
          <Card key={live.id} className="overflow-hidden">
            <div className="relative">
              <img 
                src={live.thumbnail} 
                alt={live.title} 
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-primary">
                <Clock className="w-4 h-4 mr-1" />
                {live.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{live.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {live.type} • {live.location}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <div>Agent: {live.agent}</div>
                <div>Prix: {live.price}</div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {live.availableSeats} places disponibles
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mt-4">
                    <Video className="w-4 h-4 mr-2" />
                    Réserver ma place
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Réserver pour {live.title}</DialogTitle>
                  </DialogHeader>
                  <ReservationForm live={live} />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};