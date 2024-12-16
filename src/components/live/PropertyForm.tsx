import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TagSelector } from "../profile/live-edit/TagSelector";
import { GoogleMapInput } from "../GoogleMapInput";
import { Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const PropertyForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [tags, setTags] = useState(initialData?.tags || []);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const availableTags = [
    "Luxueux",
    "Vue mer",
    "Balcon",
    "Piscine",
    "Jardin",
    "Parking",
    "Meublé",
    "Neuf",
    "Rénové"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      location,
      tags,
      files
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
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
      setFiles(prev => [...prev, ...validFiles]);
      toast({
        title: "Fichiers ajoutés",
        description: `${validFiles.length} fichier(s) ajouté(s) avec succès`,
      });
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre du bien*</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Appartement moderne à Marrakech"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez les caractéristiques et avantages du bien..."
          className="h-32"
        />
      </div>

      <div className="space-y-2">
        <Label>Localisation*</Label>
        <GoogleMapInput
          onLocationSelect={setLocation}
          value={location}
          onChange={setLocation}
        />
      </div>

      <TagSelector
        tags={tags}
        availableTags={availableTags}
        onTagToggle={(tag) => {
          setTags(prev => 
            prev.includes(tag) 
              ? prev.filter(t => t !== tag)
              : [...prev, tag]
          );
        }}
      />

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
                  const newFiles = Array.from(e.target.files);
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
        <Button type="submit">
          Suivant
        </Button>
      </div>
    </form>
  );
};