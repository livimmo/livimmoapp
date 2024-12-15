import { Heart, Video, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { type Property } from "@/types/property";

type PropertyCardProps = Property;

export const PropertyCard = ({
  id,
  images,
  title,
  price,
  location,
  type,
  surface,
  rooms,
  hasLive,
  liveDate,
}: PropertyCardProps) => {
  const [offerAmount, setOfferAmount] = useState(price);
  const { toast } = useToast();
  const navigate = useNavigate();
  const currentUrl = `${window.location.origin}/property/${id}`;

  const handleOffer = () => {
    toast({
      title: "Offre envoyée !",
      description: `Votre offre de ${offerAmount.toLocaleString()} DH pour ${title} a été envoyée.`,
    });
  };

  const handleJoinLive = () => {
    navigate(`/live/${id}`);
  };

  const handleShare = async (platform: string) => {
    const shareText = `Découvrez ce bien immobilier : ${title} - ${price.toLocaleString()} DH`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\n' + currentUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'copy':
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
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Link to={`/property/${id}`}>
          <img
            src={images[0]}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </Link>
        <div className="absolute top-2 right-2 flex gap-2">
          {hasLive && (
            <div className="p-2 bg-[#ea384c] rounded-full shadow-md">
              <Video className="w-5 h-5 text-white" />
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
              >
                <Share2 className="w-5 h-5 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
                <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2 fill-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('facebook')}>
                <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2 fill-[#1877F2]">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('twitter')}>
                <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2 fill-[#1DA1F2]">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('copy')}>
                <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2 fill-current">
                  <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"/>
                </svg>
                Copier le lien
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="p-2 bg-white rounded-full shadow-md">
            <Heart className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <Link to={`/property/${id}`}>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
        </Link>
        <p className="text-primary font-bold text-xl mb-2">
          {price.toLocaleString()} DH
        </p>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <span>{location}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>{type}</span>
          <span>{surface} m²</span>
          <span>{rooms} pièces</span>
        </div>
        <div className="space-y-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Faire une offre</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Faire une offre pour {title}</DialogTitle>
                <DialogDescription>
                  Prix demandé : {price.toLocaleString()} DH
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="text-sm font-medium">
                    Montant de votre offre (DH)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleOffer} className="w-full">
                  Envoyer l'offre
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {hasLive && (
            <Button 
              variant="outline" 
              className="w-full bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
              onClick={handleJoinLive}
            >
              <Video className="mr-2 h-4 w-4" />
              Rejoindre le live
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};