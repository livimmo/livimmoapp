import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TagSelector } from "../profile/live-edit/TagSelector";
import { GoogleMapInput } from "../GoogleMapInput";

export const PropertyForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [tags, setTags] = useState(initialData?.tags || []);
  const [files, setFiles] = useState([]);

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
        <Input
          type="file"
          onChange={(e) => setFiles(Array.from(e.target.files))}
          multiple
          accept="image/*,video/*"
          className="cursor-pointer"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">
          Suivant
        </Button>
      </div>
    </form>
  );
};