import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ReservationForm } from "../home/ReservationForm";
import { LiveEvent } from "@/types/live";

interface LiveCardProps {
  live: LiveEvent;
}

export const LiveCard = ({ live }: LiveCardProps) => {
  return (
    <Card className="overflow-hidden">
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
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#ea384c] text-white hover:bg-[#ea384c]/90">
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
      </CardFooter>
    </Card>
  );
};