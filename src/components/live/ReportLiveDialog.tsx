import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface ReportLiveDialogProps {
  liveId: number;
  isOpen: boolean;
  onClose: () => void;
}

const REPORT_REASONS = [
  { value: "inappropriate", label: "Contenu inapproprié" },
  { value: "fraudulent", label: "Contenu frauduleux" },
  { value: "offensive", label: "Propos offensants" },
  { value: "other", label: "Autre" },
] as const;

export const ReportLiveDialog = ({ liveId, isOpen, onClose }: ReportLiveDialogProps) => {
  const [reason, setReason] = useState<string>("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async () => {
    if (!reason) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une raison",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement API call when backend is ready
      console.log("Reporting live:", {
        liveId,
        reason,
        comment,
      });

      toast({
        title: "Signalement envoyé",
        description: "Notre équipe va examiner votre signalement rapidement.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du signalement",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-emerald-500" />
            Signaler ce live
          </DialogTitle>
          <DialogDescription>
            Aidez-nous à maintenir un environnement sûr en signalant tout contenu inapproprié.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Raison du signalement</label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une raison" />
              </SelectTrigger>
              <SelectContent>
                {REPORT_REASONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Commentaire (optionnel)
            </label>
            <Textarea
              placeholder="Ajoutez plus de détails ici..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Envoyer le signalement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};