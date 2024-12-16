import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Image, Trash, ChevronLeft, ChevronRight, Upload, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageCarouselProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export const ImageCarousel = ({ images, onImagesChange }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();
  const maxImages = 10;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (images.length + files.length > maxImages) {
      toast({
        title: "Limite atteinte",
        description: "Vous pouvez ajouter jusqu'à 10 images uniquement.",
        variant: "destructive",
      });
      return;
    }

    // Simuler le téléversement des images
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImagesChange([...images, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    toast({
      title: "Images ajoutées",
      description: "Les images ont été téléversées avec succès.",
    });
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Pour l'instant, on simule juste une capture
      stream.getTracks().forEach(track => track.stop());
      
      toast({
        title: "Capture non implémentée",
        description: "La capture de photo sera disponible prochainement.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'accéder à la caméra.",
        variant: "destructive",
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    if (currentIndex >= newImages.length) {
      setCurrentIndex(Math.max(0, newImages.length - 1));
    }
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={previousImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600"
              onClick={() => removeImage(currentIndex)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Image className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
              index === currentIndex ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleCameraCapture}
          className="flex-1"
          disabled={images.length >= maxImages}
        >
          <Camera className="h-4 w-4 mr-2" />
          Prendre une photo
        </Button>
        <label className="flex-1">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileUpload}
            disabled={images.length >= maxImages}
          />
          <Button variant="outline" className="w-full" asChild>
            <span>
              <Upload className="h-4 w-4 mr-2" />
              Téléverser
            </span>
          </Button>
        </label>
      </div>
    </div>
  );
};