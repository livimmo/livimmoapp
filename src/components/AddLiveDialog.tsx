import { useState } from "react";
import { Video, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

export const AddLiveDialog = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
      return;
    }

    // Pour l'instant, on affiche juste un message indiquant que la fonctionnalité arrive bientôt
    toast({
      title: "Fonctionnalité à venir",
      description: "L'ajout de lives sera bientôt disponible !",
    });
  };

  return (
    <>
      {isMobile ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleOpenChange(true)}
          className="relative"
        >
          <div className="relative">
            <Video className="h-4 w-4" />
            <Plus className="h-3 w-3 absolute -top-1 -right-1 text-primary" />
          </div>
        </Button>
      ) : (
        <Button
          onClick={() => handleOpenChange(true)}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
          size="sm"
        >
          <Video className="mr-2 h-4 w-4" />
          Ajouter un Live
        </Button>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ajouter un Live</DialogTitle>
          </DialogHeader>
          {/* Le contenu du dialogue sera implémenté dans une prochaine étape */}
        </DialogContent>
      </Dialog>
    </>
  );
};