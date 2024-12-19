import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisitBookingForm } from "./offer/VisitBookingForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface VisitBookingButtonProps {
  propertyId: number;
  propertyTitle: string;
  agentId?: number;
  agentName: string;
}

export const VisitBookingButton = ({
  propertyId,
  propertyTitle,
  agentId,
  agentName,
}: VisitBookingButtonProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleVisitRequest = (visitData: {
    type: string;
    date: Date | undefined;
    time: string;
    message: string;
  }) => {
    // TODO: Implement visit request logic with Supabase
    console.log("Visit request:", visitData);
    
    toast({
      title: "Demande envoyée",
      description: "Votre demande de visite a été envoyée à l'agent.",
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2">
          <Calendar className="h-4 w-4" />
          Réserver une visite privée
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Réserver une visite privée</DialogTitle>
        </DialogHeader>
        {user ? (
          <VisitBookingForm
            name={`${user.firstName} ${user.lastName}`}
            email={user.email}
            phone=""
            onSubmit={handleVisitRequest}
          />
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">
              Connectez-vous pour réserver une visite privée
            </p>
            <Button onClick={() => window.location.href = "/login"}>
              Se connecter
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};