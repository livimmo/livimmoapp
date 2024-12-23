import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, Video, Book, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      icon: Home,
      label: "Accueil",
      path: "/",
    },
    {
      icon: Search,
      label: "Rechercher",
      path: "/search",
    },
    {
      icon: Video,
      label: "Lives",
      path: "/lives",
    },
    {
      icon: Book,
      label: "Annuaire",
      path: "/directory",
    },
    {
      icon: User,
      label: "Profil",
      path: "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-between items-center px-4 py-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 text-sm",
              isActive(item.path)
                ? "text-primary"
                : "text-gray-500 hover:text-gray-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};