import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, MapPin, Phone, Mail } from "lucide-react";

interface OwnerProfileProps {
  user: User;
}

export const OwnerProfile = ({ user }: OwnerProfileProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{user.phone}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
            </div>

            {user.description && (
              <p className="mt-4 text-sm text-muted-foreground">
                {user.description}
              </p>
            )}
          </div>
        </div>

        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Modifier le profil
        </Button>
      </div>
    </div>
  );
};