import { Link, useLocation } from "react-router-dom";
import { Home, Heart, Building2, Video } from "lucide-react";
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
  const myPropertiesCount = mockProperties.filter(property => {
    if (property.agent && user?.id) {
      return property.agent.id?.toString() === user.id.toString();
    }
    if (isOwner && property.owner && user?.id) {
      return property.owner.id?.toString() === user.id.toString();
    }
    return false;
  }).length;

  const navItems = [
    {
      label: "Accueil",
      icon: Home,
      href: "/",
      count: 0
    },
    {
      label: "Favoris",
      icon: Heart,
      href: "/favorites",
      count: favoritesCount
    },
    {
      label: "Mes Biens",
      icon: Building2,
      href: "/properties",
      count: myPropertiesCount
    },
    {
      label: "Lives",
      icon: Video,
      href: "/lives",
      count: activeLivesCount
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 md:hidden">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center gap-1 text-xs",
              location.pathname === item.href
                ? "text-primary"
                : "text-gray-500 hover:text-primary"
            )}
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
              {item.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full text-[10px] min-w-[16px] h-4 flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};