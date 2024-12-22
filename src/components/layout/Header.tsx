import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "./header/Logo";
import { UserButtons } from "./header/UserButtons";
import { AuthButtons } from "./header/AuthButtons";

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 h-12 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          {isAuthenticated ? <UserButtons /> : <AuthButtons />}
        </div>
      </div>
    </header>
  );
};