import { Link, useLocation } from "react-router-dom";
import { Building2, Heart, Home, PlaySquare, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { mockLives } from "@/data/mockLives";
import { mockFavoritesData } from "@/data/mockFavorites";
import { mockProperties } from "@/data/mockProperties";

export const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isOwner = user?.role === "owner";

  const activeLivesCount = mockLives.filter(live => live.status === "live").length;
  const favoritesCount = mockFavoritesData.length;
  const myPropertiesCount = mockProperties.filter(property => 
    (property.agent && property.agent.id === user?.id) || 
    (isOwner && property.owner?.id === user?.id)
  ).length;

  const navItems = [
    { icon: Home, label: "Accueil", path: "/" },
    { 
      icon: PlaySquare, 
      label: "Lives", 
      path: "/lives",
      badge: activeLivesCount > 0 ? activeLivesCount : undefined 
    },
    { 
      icon: Heart, 
      label: "Favoris", 
      path: "/favorites",
      badge: favoritesCount > 0 ? favoritesCount : undefined
    },
    { 
      icon: Store, 
      label: "Mes Biens", 
      path: "/owner-dashboard",
      badge: myPropertiesCount > 0 ? myPropertiesCount : undefined,
      show: isOwner
    }
  ].filter(item => !item.show || item.show === true);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
      <div className="flex justify-around items-center max-w-screen-xl mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center text-xs font-medium relative",
              location.pathname === item.path
                ? "text-primary"
                : "text-gray-500 hover:text-primary"
            )}
          >
            <item.icon className="h-6 w-6 mb-1" />
            {item.badge && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};