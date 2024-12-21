import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Visit } from "@/types/visit";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Home,
  MessageSquare,
  Check,
  X,
  RefreshCw
} from "lucide-react";

interface VisitDetailsDialogProps {
  visit: Visit;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VisitDetailsDialog = ({
  visit,
  open,
  onOpenChange,
}: VisitDetailsDialogProps) => {
  const { toast } = useToast();

  const handleConfirm = () => {
    toast({
      title: "Visite confirmée",
      description: "La visite a été confirmée avec succès",
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    toast({
      title: "Visite annulée",
      description: "La visite a été annulée avec succès",
    });
    onOpenChange(false);
  };

  const handleReschedule = () => {
    toast({
      title: "Replanification",
      description: "Fonctionnalité à venir",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Détails de la visite</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{format(visit.date, "EEEE d MMMM yyyy", { locale: fr })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{visit.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>{visit.agent.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{visit.agent.contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{visit.agent.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-muted-foreground" />
              <span>{visit.propertyTitle}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {visit.status === "pending" && (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
                <Button variant="outline" onClick={handleReschedule}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Replanifier
                </Button>
                <Button onClick={handleConfirm}>
                  <Check className="w-4 h-4 mr-2" />
                  Confirmer
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};