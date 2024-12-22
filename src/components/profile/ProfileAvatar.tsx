import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, IdCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { StarRating } from "../ratings/StarRating";
import { AccountType } from "@/types/user";

interface ProfileAvatarProps {
  firstName: string;
  lastName: string;
  avatar?: string;
  accountType: AccountType;
  rating?: number;
  totalReviews?: number;
}

export const ProfileAvatar = ({ 
  firstName, 
  lastName, 
  avatar, 
  accountType,
  rating = 0,
  totalReviews = 0
}: ProfileAvatarProps) => {
  const handleIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement file upload logic when backend is ready
      console.log("ID uploaded:", file);
    }
  };

  const handlePhotoCapture = () => {
    // TODO: Implement photo capture logic when backend is ready
    console.log("Photo captured");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={avatar} />
        <AvatarFallback>
          {firstName[0]}
          {lastName[0]}
        </AvatarFallback>
      </Avatar>
      
      {accountType === "agent" && rating > 0 && (
        <div className="text-center">
          <StarRating rating={rating} totalReviews={totalReviews} />
        </div>
      )}

      <Button variant="outline" size="sm">
        <Camera className="mr-2 h-4 w-4" />
        Modifier la photo
      </Button>

      {accountType === "buyer" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <IdCard className="mr-2 h-4 w-4" />
              Pièce d'identité
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter votre pièce d'identité</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <label htmlFor="id-upload" className="block">
                  <Button variant="outline" className="w-full" asChild>
                    <span>
                      <IdCard className="mr-2 h-4 w-4" />
                      Télécharger une photo
                    </span>
                  </Button>
                </label>
                <input
                  id="id-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleIdUpload}
                  className="hidden"
                />
              </div>
              <div className="text-center">ou</div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handlePhotoCapture}
              >
                <Camera className="mr-2 h-4 w-4" />
                Prendre en photo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};