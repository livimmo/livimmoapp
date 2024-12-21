import { Visit } from "@/types/visit";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { VisitReschedulingDialog } from "./VisitReschedulingDialog";
import { VisitCancellationDialog } from "./VisitCancellationDialog";

interface AgentVisitActionsProps {
  visit: Visit;
  onVisitUpdate: (updatedVisit: Visit) => void;
}

export const AgentVisitActions = ({ visit, onVisitUpdate }: AgentVisitActionsProps) => {
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { toast } = useToast();

  const handleReschedule = (newDate: Date, newTime: string) => {
    const updatedVisit = {
      ...visit,
      date: newDate,
      time: newTime,
      status: "pending" as const,
    };
    onVisitUpdate(updatedVisit);

    toast({
      title: "Visite reprogrammée",
      description: `La visite a été reprogrammée pour le ${newDate.toLocaleDateString()} à ${newTime}. Le visiteur a été notifié.`,
    });
  };

  const handleCancel = (reason: string) => {
    const updatedVisit = {
      ...visit,
      status: "cancelled" as const,
    };
    onVisitUpdate(updatedVisit);

    toast({
      title: "Visite annulée",
      description: "La visite a été annulée et le visiteur a été notifié.",
    });
  };

  if (visit.status === "cancelled" || visit.status === "completed") {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowRescheduleDialog(true)}
      >
        <Calendar className="w-4 h-4 mr-2" />
        Reprogrammer
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setShowCancelDialog(true)}
      >
        <X className="w-4 h-4 mr-2" />
        Annuler
      </Button>

      <VisitReschedulingDialog
        open={showRescheduleDialog}
        onOpenChange={setShowRescheduleDialog}
        onConfirm={handleReschedule}
        visitTitle={visit.propertyTitle}
        currentDate={visit.date}
        currentTime={visit.time}
      />

      <VisitCancellationDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        onConfirm={handleCancel}
        visitTitle={visit.propertyTitle}
      />
    </div>
  );
};