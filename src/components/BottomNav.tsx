import { Home, Search, Video, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { icon: Home, label: "Accueil", path: "/" },
    { icon: Search, label: "Recherche", path: "/search" },
    { icon: Video, label: "Lives", path: "/lives" },
    { icon: Heart, label: "Favoris", path: "/favorites" },
    { icon: User, label: "Profil", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 ${
              isActive(item.path)
                ? "text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};