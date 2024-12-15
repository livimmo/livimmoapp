import { Video, Calendar, Users, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReservationForm } from "../home/ReservationForm";
import { Badge } from "@/components/ui/badge";

interface LiveButtonProps {
  id: number;
  title: string;
  liveDate?: Date;
  onJoinLive: () => void;
  isLiveNow?: boolean;
  remainingSeats?: number;
}

export const LiveButton = ({ 
  id, 
  title, 
  liveDate, 
  onJoinLive,
  isLiveNow,
  remainingSeats = 15
}: LiveButtonProps) => {
  if (isLiveNow) {
    return (
      <Button 
        variant="outline" 
        className="w-full bg-[#ea384c] text-white hover:bg-[#ea384c]/90 animate-pulse"
        onClick={onJoinLive}
      >
        <Video className="mr-2 h-4 w-4" />
        Rejoindre le live
      </Button>
    );
  }

  if (liveDate && new Date(liveDate) > new Date()) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full bg-primary text-white hover:bg-primary/90">
            <Calendar className="mr-2 h-4 w-4" />
            S'inscrire au live
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>S'inscrire au live</DialogTitle>
            <DialogDescription className="space-y-2">
              <p>
                Live programmé le{" "}
                {new Date(liveDate).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                <Users className="w-4 h-4 mr-1" />
                {remainingSeats} places restantes
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <ReservationForm
            live={{
              id,
              title,
              date: new Date(liveDate),
              availableSeats: remainingSeats,
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return null;
};