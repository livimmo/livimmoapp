import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { SocialConnect } from "@/components/profile/SocialConnect";
import { useAuth } from "@/contexts/AuthContext";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { UserRole } from "@/types/user";
import { Card } from "@/components/ui/card";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"credentials" | "role">("credentials");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "credentials") {
      setStep("role");
    } else if (selectedRole) {
      await login(formData.email, formData.password, selectedRole);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            {step === "credentials" ? "Connexion à votre compte" : "Choisissez votre rôle"}
          </h1>
          <p className="text-muted-foreground">
            {step === "credentials" 
              ? "Entrez vos identifiants pour accéder à votre compte"
              : "Sélectionnez votre rôle pour personnaliser votre expérience"
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === "credentials" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-gray-300"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Se souvenir de moi
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>
          ) : (
            <RoleSelector
              selectedRole={selectedRole}
              onSelect={setSelectedRole}
            />
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={step === "role" && !selectedRole}
          >
            {step === "credentials" ? "Continuer" : "Se connecter"}
          </Button>

          {step === "credentials" && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou connectez-vous avec
                  </span>
                </div>
              </div>

              <SocialConnect />
            </>
          )}
        </form>

        <Card className="p-6 bg-accent border-none shadow-none">
          <div className="text-center space-y-4">
            <h2 className="text-lg font-semibold text-primary">
              Nouveau sur Livimmo ?
            </h2>
            <p className="text-sm text-muted-foreground">
              Créez votre compte gratuitement et accédez à toutes nos fonctionnalités exclusives : 
              participez à des lives, faites des offres et suivez vos interactions.
            </p>
            <Link to="/signup">
              <Button 
                variant="default" 
                className="w-full gap-2 bg-primary hover:bg-primary/90"
                size="lg"
              >
                <UserPlus className="h-5 w-5" />
                Créer mon compte gratuitement
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;