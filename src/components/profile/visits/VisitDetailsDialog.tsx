import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Visit } from "@/types/visit";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

interface VisitDetailsDialogProps {
  visit: Visit | null;
  onClose: () => void;
}

export const VisitDetailsDialog = ({ visit, onClose }: VisitDetailsDialogProps) => {
  if (!visit) return null;

  return (
    <Dialog open={!!visit} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Détails de la visite</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex gap-4">
            <img
              src={visit.propertyImage}
              alt={visit.propertyTitle}
              className="w-32 h-32 object-cover rounded"
            />
            <div className="space-y-2">
              <h3 className="font-medium text-lg">{visit.propertyTitle}</h3>
              <p className="text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {visit.propertyLocation}
              </p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(visit.date, "d MMMM yyyy", { locale: fr })}</span>
                <Clock className="h-4 w-4 ml-2" />
                <span>{visit.time}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Agent immobilier</h4>
            <div className="flex items-center gap-4">
              <img
                src={visit.agentImage}
                alt={visit.agentName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium">{visit.agentName}</p>
                <div className="flex gap-4 mt-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    {visit.agentPhone}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    {visit.agentEmail}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {visit.status === "pending" && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Fermer
              </Button>
              <Button variant="destructive">
                Annuler la visite
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};