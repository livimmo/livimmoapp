import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagSelector } from "../profile/live-edit/TagSelector";
import { GoogleMapInput } from "../GoogleMapInput";
import { Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { BasicInfoFields } from "./property/BasicInfoFields";

interface PropertyFormProps {
  onSubmit: (data: any) => void;
  initialData?: {
    title?: string;
    description?: string;
    location?: string;
    propertyType?: string;
    price?: string;
    surface?: string;
    tags?: string[];
  };
}

interface FileWithPreview extends File {
  type: string;
}

export const PropertyForm = ({ onSubmit, initialData }: PropertyFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [propertyType, setPropertyType] = useState(initialData?.propertyType || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [surface, setSurface] = useState(initialData?.surface || "");
  const [tags, setTags] = useState(initialData?.tags || []);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const availableTags = [
    "Luxueux",
    "Vue mer",
    "Piscine",
    "Jardin",
    "Terrasse",
    "Parking",
    "Meublé",
    "Neuf",
    "Rénové",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      location,
      propertyType,
      price,
      surface,
      tags,
      files,
    });
  };

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
    
    const droppedFiles = Array.from(e.dataTransfer.files) as FileWithPreview[];
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
      setFiles(prev => [...prev, ...validFiles]);
      toast({
        title: "Fichiers ajoutés",
        description: `${validFiles.length} fichier(s) ajouté(s) avec succès`,
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoFields
        title={title}
        description={description}
        price={price}
        surface={surface}
        propertyType={propertyType}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onPriceChange={setPrice}
        onSurfaceChange={setSurface}
        onPropertyTypeChange={setPropertyType}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Localisation*</label>
        <GoogleMapInput
          value={location}
          onChange={setLocation}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <TagSelector
          selectedTags={tags}
          availableTags={availableTags}
          onChange={setTags}
        />
      </div>

      <div className="space-y-2">
        <Label>Photos/Vidéos</Label>
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
                  const newFiles = Array.from(e.target.files || []) as FileWithPreview[];
                  setFiles(prev => [...prev, ...newFiles]);
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

        {files.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
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
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">Suivant</Button>
      </div>
    </form>
  );
};