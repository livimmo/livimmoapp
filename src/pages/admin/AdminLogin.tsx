import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } = await signIn(email, password);
      
      if (authError) throw authError;

      const { data: adminProfile, error: adminError } = await supabase
        .from("admin_profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (adminError || !adminProfile) {
        throw new Error("Unauthorized access");
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      navigate("/admin");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials or unauthorized access.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Admin Login
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the admin panel
          </p>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button disabled={loading}>
                {loading && (
                  <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
                )}
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}