import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaUploadStepProps {
  data: any[];
  onUpdate: (data: any[]) => void;
}

export const MediaUploadStep = ({ data, onUpdate }: MediaUploadStepProps) => {
  const [files, setFiles] = useState<File[]>(data || []);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );

    if (validFiles.length !== droppedFiles.length) {
      toast({
        title: "Fichiers non valides",
        description: "Seuls les images et vidéos sont acceptées",
        variant: "destructive",
      });
    }

    if (validFiles.length > 0) {
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      onUpdate(newFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onUpdate(newFiles);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Photos et vidéos*</Label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/10' 
              : 'border-gray-300 hover:border-primary'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-600">
              Glissez et déposez vos fichiers ici ou
            </p>
            <label className="cursor-pointer">
              <Input
                type="file"
                onChange={(e) => {
                  const newFiles = Array.from(e.target.files || []);
                  const updatedFiles = [...files, ...newFiles];
                  setFiles(updatedFiles);
                  onUpdate(updatedFiles);
                }}
                multiple
                accept="image/*,video/*"
                className="hidden"
              />
              <Button type="button" variant="outline" size="sm">
                Parcourir
              </Button>
            </label>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(file)}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="virtualTourUrl">Lien de visite virtuelle (optionnel)</Label>
        <Input
          id="virtualTourUrl"
          type="url"
          placeholder="https://"
        />
      </div>
    </div>
  );
};