import { Heart, Video } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Property } from "@/types/property";

type PropertyCardProps = Pick<Property, "id" | "images" | "title" | "price" | "location" | "type" | "surface" | "rooms" | "hasLive" | "liveDate">;

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

  const handleOffer = () => {
    toast({
      title: "Offre envoyée !",
      description: `Votre offre de ${offerAmount.toLocaleString()} DH pour ${title} a été envoyée.`,
    });
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
            <Button variant="outline" className="w-full bg-[#ea384c] text-white hover:bg-[#ea384c]/90">
              <Video className="mr-2 h-4 w-4" />
              Rejoindre le live
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};