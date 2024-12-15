import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface ProfileAvatarProps {
  firstName: string;
  lastName: string;
  avatar?: string;
}

export const ProfileAvatar = ({ firstName, lastName, avatar }: ProfileAvatarProps) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={avatar} />
        <AvatarFallback>
          {firstName[0]}
          {lastName[0]}
        </AvatarFallback>
      </Avatar>
      <Button variant="outline" size="sm">
        <Camera className="mr-2 h-4 w-4" />
        Modifier la photo
      </Button>
    </div>
  );
};