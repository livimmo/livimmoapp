import { useState } from "react";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

const SelectRole = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>();
  const { updateUserRole } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      await updateUserRole(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Quel est votre rôle ?
          </h1>
          <p className="text-muted-foreground">
            Sélectionnez votre rôle pour personnaliser votre expérience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <RoleSelector
            selectedRole={selectedRole}
            onSelect={setSelectedRole}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={!selectedRole}
          >
            Continuer
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SelectRole;