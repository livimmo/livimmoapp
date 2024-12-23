import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export function AdminHeader() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <a href="/admin" className="flex items-center gap-2 font-semibold">
          <img
            src="/livimmo-icon.svg"
            alt="Livimmo"
            className="h-8 w-8"
          />
          <span>Livimmo Admin</span>
        </a>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSignOut}
          className="h-9 w-9"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}