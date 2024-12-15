import { MessageCircle, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface ShareButtonsProps {
  property: {
    title: string;
    price: number;
    location: string;
  };
  currentUrl: string;
}

export const ShareButtons = ({ property, currentUrl }: ShareButtonsProps) => {
  const message = `Découvrez ce bien immobilier : ${property.title} à ${
    property.location
  } - ${property.price.toLocaleString()} DH`;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${message}\n${currentUrl}`
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      message
    )}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Lien copié !",
        description: "Le lien a été copié dans votre presse-papiers.",
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien.",
        variant: "destructive",
      });
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
  };

  const handleEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      property.title
    )}&body=${encodeURIComponent(`${message}\n${currentUrl}`)}`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="icon"
        className="bg-[#25D366] hover:bg-[#25D366]/90 text-white"
        onClick={() => handleShare("whatsapp")}
      >
        <MessageCircle className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
        onClick={() => handleShare("facebook")}
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
        onClick={() => handleShare("twitter")}
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white"
        onClick={() => handleShare("linkedin")}
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleEmail}
      >
        <Mail className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
      >
        Copier le lien
      </Button>
    </div>
  );
};