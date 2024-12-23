import { Building2, Building, Home, ShoppingBag, Key } from "lucide-react";
import { UserRole } from "@/types/user";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const roleOptions: { value: UserRole; label: string; icon: any; description: string }[] = [
  {
    value: "owner",
    label: "Propriétaire",
    icon: Key,
    description: "Gérez vos biens et suivez les visites"
  },
  {
    value: "promoter",
    label: "Promoteur",
    icon: Building2,
    description: "Publiez des biens et organisez des lives"
  },
  {
    value: "agent",
    label: "Agent immobilier",
    icon: Building,
    description: "Gérez votre portefeuille et vos clients"
  },
  {
    value: "tenant",
    label: "Locataire",
    icon: Home,
    description: "Recherchez des locations et participez aux lives"
  },
  {
    value: "buyer",
    label: "Acheteur",
    icon: ShoppingBag,
    description: "Recherchez des biens à acheter"
  },
];

export const RoleSwitcher = () => {
  const { user, switchRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRoleChange = async (newRole: UserRole) => {
    if (newRole === user?.role) return;

    try {
      await switchRole(newRole);
      
      // Redirection en fonction du rôle
      switch (newRole) {
        case "owner":
          navigate("/owner-dashboard");
          break;
        case "promoter":
        case "agent":
          navigate("/property-management");
          break;
        case "tenant":
        case "buyer":
          navigate("/properties");
          break;
      }

      toast({
        title: "Rôle modifié",
        description: `Vous êtes maintenant en mode ${
          roleOptions.find(r => r.value === newRole)?.label
        }`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de changer de rôle pour le moment",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  const selectedRole = roleOptions.find(role => role.value === user.role);

  return (
    <div className="space-y-2">
      <Label>Type de compte</Label>
      <Select value={user.role} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-full">
          <SelectValue>
            {selectedRole && (
              <div className="flex items-center gap-2">
                <selectedRole.icon className="h-4 w-4" />
                <span>{selectedRole.label}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {roleOptions.map((role) => (
            <SelectItem 
              key={role.value} 
              value={role.value}
              className="py-3"
            >
              <div className="flex items-center gap-2">
                <role.icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">{role.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {role.description}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};