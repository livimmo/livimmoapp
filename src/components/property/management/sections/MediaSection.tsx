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

  const handleCameraCapture = async (type: 'image' | 'video') => {
    try {
      const constraints = {
        video: type === 'video' ? true : {
          facingMode: 'environment'
        },
        audio: type === 'video'
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (type === 'image') {
        const video = document.createElement('video');
        video.srcObject = stream;
        await video.play();

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const context = canvas.getContext('2d');
        context?.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
            handleImageUpload(new FileList());
          }
        }, 'image/jpeg');

        stream.getTracks().forEach(track => track.stop());
      } else {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/mp4' });
          const file = new File([blob], `video_${Date.now()}.mp4`, { type: 'video/mp4' });
          handleVideoUpload(new FileList());
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setTimeout(() => mediaRecorder.stop(), 30000); // 30 secondes maximum
      }

      toast({
        title: "Capture réussie",
        description: `La ${type === 'image' ? 'photo' : 'vidéo'} a été ajoutée avec succès.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'accéder à la caméra. Veuillez vérifier les permissions.",
        variant: "destructive",
      });
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
          <p className="text-sm text-gray-600 text-center">
            Glissez et déposez vos fichiers ici ou utilisez les options ci-dessous
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <label>
              <Input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
              />
              <Button type="button" variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Photos
              </Button>
            </label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => handleCameraCapture('image')}
            >
              <Camera className="h-4 w-4 mr-2" />
              Prendre photo
            </Button>
            <label>
              <Input
                type="file"
                className="hidden"
                accept="video/*"
                onChange={(e) => e.target.files && handleVideoUpload(e.target.files)}
              />
              <Button type="button" variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Vidéo
              </Button>
            </label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => handleCameraCapture('video')}
            >
              <Video className="h-4 w-4 mr-2" />
              Filmer
            </Button>
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