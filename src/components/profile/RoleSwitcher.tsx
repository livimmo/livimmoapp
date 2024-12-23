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

const roleOptions: { value: UserRole; label: string; icon: any }[] = [
  {
    value: "owner",
    label: "Propriétaire",
    icon: Key,
  },
  {
    value: "promoter",
    label: "Promoteur",
    icon: Building2,
  },
  {
    value: "agent",
    label: "Agent immobilier",
    icon: Building,
  },
  {
    value: "tenant",
    label: "Locataire",
    icon: Home,
  },
  {
    value: "buyer",
    label: "Acheteur",
    icon: ShoppingBag,
  },
];

export const RoleSwitcher = () => {
  const { user, switchRole } = useAuth();
  const { toast } = useToast();

  const handleRoleChange = (newRole: UserRole) => {
    if (newRole === user?.role) return;

    toast({
      title: "Confirmation",
      description: `Voulez-vous vraiment passer en mode ${newRole} ?`,
      action: (
        <button
          onClick={() => switchRole(newRole)}
          className="bg-primary text-white px-3 py-1 rounded-md text-sm"
        >
          Confirmer
        </button>
      ),
    });
  };

  if (!user) return null;

  return (
    <div className="space-y-2">
      <Label>Changer de rôle</Label>
      <Select value={user.role} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionner un rôle" />
        </SelectTrigger>
        <SelectContent>
          {roleOptions.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              <div className="flex items-center gap-2">
                <role.icon className="h-4 w-4" />
                <span>{role.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};