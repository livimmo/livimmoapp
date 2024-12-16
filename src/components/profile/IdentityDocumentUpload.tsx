import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload } from "lucide-react";

export const IdentityDocumentUpload = () => {
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérification de la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "Le fichier est trop volumineux. Taille maximum : 5MB",
          variant: "destructive",
        });
        return;
      }

      // Vérification du type de fichier
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        toast({
          title: "Erreur",
          description: "Format de fichier non supporté. Utilisez JPG, PNG ou PDF",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Pièce d'identité téléchargée avec succès",
      });
    }
  };

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Utilise la caméra arrière par défaut
    
    // Créer une fonction qui convertit l'événement en React.ChangeEvent<HTMLInputElement>
    input.onchange = (e) => {
      if (e.target instanceof HTMLInputElement) {
        const syntheticEvent = {
          target: e.target,
          preventDefault: () => {},
          stopPropagation: () => {},
          nativeEvent: e,
          currentTarget: e.currentTarget,
          bubbles: e.bubbles,
          cancelable: e.cancelable,
          defaultPrevented: e.defaultPrevented,
          eventPhase: e.eventPhase,
          isTrusted: e.isTrusted,
          timeStamp: e.timeStamp,
          type: e.type,
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleFileUpload(syntheticEvent);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <h3 className="text-lg font-semibold">
        Pièce d'identité
      </h3>
      <div className="space-y-2">
        <Label htmlFor="idDocument">Télécharger votre pièce d'identité</Label>
        <div className="flex flex-wrap items-center gap-4">
          <Input
            id="idDocument"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('idDocument')?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Choisir un fichier
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCameraCapture}
              className="flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              Prendre en photo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Formats acceptés : JPG, PNG, PDF (max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
};