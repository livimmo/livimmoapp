import { Home, Search, Video, Heart, User, Building2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { liveStreams } from "@/data/mockLives";
import { mockFavoritesData } from "@/data/mockFavorites";

export const BottomNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Compte le nombre de lives en cours
  const activeLivesCount = liveStreams.filter(live => live.status === "live").length;

  // Compte le nombre de favoris
  const favoritesCount = mockFavoritesData.length;

  const navItems = [
    { icon: Home, label: "Accueil", path: "/" },
    { icon: Search, label: "Recherche", path: "/search" },
    { 
      icon: Video, 
      label: "Lives", 
      path: "/lives",
      badge: activeLivesCount > 0 ? activeLivesCount : undefined 
    },
    { icon: Building2, label: "Promoteurs", path: "/developers" },
    { 
      icon: Heart, 
      label: "Favoris", 
      path: "/favorites",
      badge: isAuthenticated && favoritesCount > 0 ? favoritesCount : undefined
    },
    { icon: User, label: "Profil", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 relative ${
              isActive(item.path)
                ? "text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.badge !== undefined && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {item.badge}
              </span>
            )}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};