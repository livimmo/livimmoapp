import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X, Camera, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaSectionProps {
  onImagesChange: (images: File[]) => void;
  onVideoChange: (video: File | null) => void;
}

export const MediaSection = ({ onImagesChange, onVideoChange }: MediaSectionProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (images.length + newImages.length > 5) {
      toast({
        title: "Limite atteinte",
        description: "Vous pouvez ajouter jusqu'à 5 images uniquement.",
        variant: "destructive",
      });
      return;
    }

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleVideoUpload = (files: FileList) => {
    const videoFile = Array.from(files).find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      setVideo(videoFile);
      onVideoChange(videoFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const removeVideo = () => {
    setVideo(null);
    onVideoChange(null);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-600">
            Glissez et déposez vos fichiers ici ou
          </p>
          <div className="flex gap-2">
            <label>
              <Input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
              />
              <Button type="button" variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Photos
              </Button>
            </label>
            <label>
              <Input
                type="file"
                className="hidden"
                accept="video/*"
                onChange={(e) => e.target.files && handleVideoUpload(e.target.files)}
              />
              <Button type="button" variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Vidéo
              </Button>
            </label>
          </div>
        </div>
      </div>

      {/* Aperçu des images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Aperçu de la vidéo */}
      {video && (
        <div className="relative group">
          <video
            src={URL.createObjectURL(video)}
            className="w-full aspect-video rounded-lg"
            controls
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={removeVideo}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};