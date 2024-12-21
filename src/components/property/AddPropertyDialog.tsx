import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { Upload, X, Video, Calendar, Play, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddPropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddPropertyDialog = ({ open, onOpenChange }: AddPropertyDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [surface, setSurface] = useState("");
  const [rooms, setRooms] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState<"Vente" | "Location">("Vente");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [hasLive, setHasLive] = useState(false);
  const [liveType, setLiveType] = useState<"live" | "scheduled" | "replay" | "virtual">("live");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !type || !price || !location || !surface || !rooms) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bien ajouté",
      description: "Le bien a été ajouté avec succès",
    });
    
    onOpenChange(false);
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

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getLiveIcon = () => {
    switch (liveType) {
      case "live":
        return <Play className="h-4 w-4" />;
      case "scheduled":
        return <Calendar className="h-4 w-4" />;
      case "replay":
        return <Video className="h-4 w-4" />;
      case "virtual":
        return <Camera className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col gap-0 p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl font-semibold">Ajouter un bien</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre*</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Villa moderne avec piscine"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type de bien*</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Prix*</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Prix en DH"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localisation*</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex: Marrakech, Guéliz"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="surface">Surface (m²)*</Label>
                <Input
                  id="surface"
                  type="number"
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                  placeholder="Surface en m²"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rooms">Nombre de pièces*</Label>
                <Input
                  id="rooms"
                  type="number"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Nombre de pièces"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionType">Type de transaction*</Label>
                <Select 
                  value={transactionType} 
                  onValueChange={(value: "Vente" | "Location") => setTransactionType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vente">Vente</SelectItem>
                    <SelectItem value="Location">Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description détaillée du bien"
                className="h-32"
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
                        const newFiles = Array.from(e.target.files || []);
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="hasLive">Activer le Live</Label>
                <Switch
                  id="hasLive"
                  checked={hasLive}
                  onCheckedChange={setHasLive}
                />
              </div>

              {hasLive && (
                <div className="space-y-2">
                  <Label>Type de Live</Label>
                  <Select value={liveType} onValueChange={(value: "live" | "scheduled" | "replay" | "virtual") => setLiveType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="live">
                        <div className="flex items-center gap-2">
                          <Play className="h-4 w-4" />
                          Live en direct
                        </div>
                      </SelectItem>
                      <SelectItem value="scheduled">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Live programmé
                        </div>
                      </SelectItem>
                      <SelectItem value="replay">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          Replay disponible
                        </div>
                      </SelectItem>
                      <SelectItem value="virtual">
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4" />
                          Visite virtuelle
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Badge variant="outline" className="mt-2">
                    {getLiveIcon()}
                    <span className="ml-2">
                      {liveType === "live" && "Live en direct"}
                      {liveType === "scheduled" && "Live programmé"}
                      {liveType === "replay" && "Replay disponible"}
                      {liveType === "virtual" && "Visite virtuelle"}
                    </span>
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">
                Ajouter le bien
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
