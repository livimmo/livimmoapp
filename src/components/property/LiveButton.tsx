import { Video } from "lucide-react";
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

interface LiveButtonProps {
  id: number;
  title: string;
  liveDate?: Date;
  onJoinLive: () => void;
}

export const LiveButton = ({ id, title, liveDate, onJoinLive }: LiveButtonProps) => {
  const isUpcoming = liveDate && new Date(liveDate) > new Date();

  if (isUpcoming) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full bg-[#ea384c] text-white hover:bg-[#ea384c]/90">
            <Video className="mr-2 h-4 w-4" />
            S'inscrire au live
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>S'inscrire au live</DialogTitle>
            <DialogDescription>
              Live programmé le {new Date(liveDate).toLocaleDateString()} à{" "}
              {new Date(liveDate).toLocaleTimeString()}
            </DialogDescription>
          </DialogHeader>
          <ReservationForm
            live={{
              id,
              title,
              date: new Date(liveDate),
              availableSeats: 15,
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button 
      variant="outline" 
      className="w-full bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
      onClick={onJoinLive}
    >
      <Video className="mr-2 h-4 w-4" />
      Rejoindre le live
    </Button>
  );
};